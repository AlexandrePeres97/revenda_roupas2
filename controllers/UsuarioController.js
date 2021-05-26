const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const knex = require('../database/dbConfig')

module.exports = {

    async index(req, res) {
        const usuarios = await knex('usuarios');
        res.status(200).json(usuarios);
    },

    async store(req, res) {
        //destruturação do objeto request
        const { nome, email, senha } = req.body;

        // se algum não for passado 
        if (!nome || !email || !senha) {
            res.status(400).json({ erro: "Enviar nome, email e senha do usuario" });
            return;
        }

        try {
            const dados = await knex("usuarios").where({ email });
            if (dados.length) {
                res.status(400).json({ erro: "Email já cadastrado" })
                return
            }
        } catch (error) {
            res.status(400).json({ erro: error.message });
            return
        }

        ///// GERA UM HASH DA SENHA 
        const hash = bcrypt.hashSync(senha, 10);

        try {
            const novo = await knex("usuarios").insert({ nome, email, senha: hash });
            res.status(201).json({ id: novo[0] });
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    },

    async login(req, res) {
        // faz a destruturação do objeto body
        const { email, senha } = req.body;

        if (!email || !senha) {
            //  res.status(400).json({ erro: "Enviar email e senha do usuario" });
            res.status(400).json({ erro: "Login/senha incorretos" });
            return;
        }

        try {
            const dados = await knex("usuarios").where({ email });
            if (dados.length == 0) {
                // res.status(400).json({ erro: "Email não cadastrado" });
                res.status(400).json({ erro: "Login/senha incorretos" });
                return;
            }

            // compara a senha informada no login com o hash slavo no banco
            if (bcrypt.compareSync(senha, dados[0].senha)) {

                const token = jwt.sign({
                    usuario_id: dados[0].id,
                    usuario_id: dados[0].nome
                },
                    process.env.JWT_KEY,
                    { expiresIn: "1h" }
                );

                res.status(200).json({ token })
            } else {
                // res.status(400).json({ erro: "Senha incorreta" });
                res.status(400).json({ erro: "Login/senha incorretos" });
            }

        } catch (error) {
            res.status(400).json({ erro: error.message });
        }



    }

};