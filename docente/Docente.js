const Sequelize = require("sequelize");

const connection = require("../database/database");

const Docente = connection.define('docente', {
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
});

Docente.sync({force:true});

module.exports = Docente;