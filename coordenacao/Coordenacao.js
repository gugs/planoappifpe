const Sequelize = require("sequelize");

const connection = require("../database/database");

const Coordenacao = connection.define('coordenacao',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
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