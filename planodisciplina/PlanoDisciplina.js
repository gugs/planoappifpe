const Sequelize = require("sequelize");

const connection = require("../database/database");

const PlanoDisciplina = connection.define('planodisciplinas',{
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

module.exports = PlanoDisciplina;