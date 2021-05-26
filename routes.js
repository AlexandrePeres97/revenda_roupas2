const express = require("express");
const routes = express.Router();

const RoupaController = require('./controllers/RoupaController')
const UsuarioController = require('./controllers/UsuarioController')
const login = require("./middleware/login");

routes.get("/roupas", RoupaController.index)
    .post("/roupas", login, RoupaController.store);


routes.get("/usuarios", UsuarioController.index)
    .post("/usuarios", UsuarioController.store)
    .post("/login", UsuarioController.login);

module.exports = routes;
