const Sequelize = require("sequelize");

const connection = require("../database/database");

const PlanoTrabalho = connection.define('planotrabalhos',{
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
    }
});

module.exports = PlanoTrabalho;