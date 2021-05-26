const knex = require('../database/dbConfig')

module.exports = {

    //index: listagem
    // store/create: inclusão
    //update: alteração
    //show: obtem 1 registro
    //destroy: exclusão

    async index(req, res) {
        //     const roupas = await knex('roupas')
        //         .join("marcas", "roupas.marca_id", "=", "marcas.id")
        //         .orderBy("roupas.id", "desc");
        //     res.status(200).json(roupas);
        const roupas = await knex
            .select("r.id", "r.modelo", "m.nome as marca", "r.lancamento", "r.preco", "r.foto")
            .from("roupas as r")
            .leftJoin("marcas as m", "r.marca_id", "m.id")
            .orderBy("r.id", "desc");
        res.status(200).json(roupas);
    },

    async store(req, res) {
        //destruturação do objeto request
        const { modelo, marca_id, lancamento, preco, foto } = req.body;

        // se algum não for passado 
        if (!modelo || !marca_id || !lancamento || !preco || !foto) {
            res.status(400).json({
                erro: "Enviar modelo, marca_id, lancamento, preco e foto da roupa",
            });
            return;
        }

        try {
            const novo = await knex("roupas").insert({ modelo, marca_id, lancamento, preco, foto });
            res.status(201).json({ id: novo[0] })
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    },
};