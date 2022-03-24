const Sequelize = require("sequelize");

const connection = require("../database/database");

//const PlanoTrabalho = require("../planotrabalho/PlanoTrabalho");

const Docente = connection.define('docentes', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    siape: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    regime:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },
    admin:
    {
        type: Sequelize.SMALLINT,
        allowNull: false
    }
});


module.exports = Docente;