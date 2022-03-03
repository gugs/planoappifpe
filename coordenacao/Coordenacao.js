const Sequelize = require("sequelize");

const connection = require("../database/database");

const Coordenacao = connection.define('coordenacao',{
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Coordenacao;