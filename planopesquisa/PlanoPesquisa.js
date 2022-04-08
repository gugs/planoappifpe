const Sequelize = require("sequelize");

const connection = require("../database/database");

const PlanoPesquisa = connection.define('planopesquisas',{
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

module.exports = PlanoPesquisa;