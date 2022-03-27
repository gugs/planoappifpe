const Sequelize = require("sequelize");

const connection = require("../database/database");

const PlanoExtensao = connection.define('planoextensoes',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    ano:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = PlanoExtensao;