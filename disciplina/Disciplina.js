const Sequelize = require("sequelize");

const connection = require("../database/database");

const Disciplina = connection.define('disciplinas',{
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    cargaHorariaAula:{
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    cargaHorariaRelogio:{
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    tipo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Disciplina;