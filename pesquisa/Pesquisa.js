const Sequelize = require("sequelize");

const connection = require("../database/database");

const Docente = require("../docente/Docente");

const Pesquisa = connection.define('pesquisas',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    anoinicio:{
        type: Sequelize.STRING,
        allowNull: false
    },
    anofim:{
        type: Sequelize.STRING,
        allowNull: false
    },
    prorrogado:{
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    cargahoraria:{
        type: Sequelize.TINYINT,
        allowNull: false
    }   
});


module.exports = Pesquisa;