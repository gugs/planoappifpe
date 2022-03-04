const Sequelize = require("sequelize");

const connection = require("../database/database");

const Docente = require("../docente/Docente")

const PlanoTrabalho = connection.define('planotrabalhos',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    ano:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    semestre:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    grupo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    observacoes:{
        type: Sequelize.TEXT
    },
    docenteId:{ 
        type: Sequelize.INTEGER, 
        references: {
            model: Docente, 
            referencesKey: "id" }
    }
});

module.exports = PlanoTrabalho;