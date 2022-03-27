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
    status:{
        type: Sequelize.TEXT,
        defaultValue: "Pendente"
    },
    editable:{
        type: Sequelize.BOOLEAN,
        defaultValue: 1
    },
    comprovantespath:{
        type: Sequelize.STRING,
        allowNull: true
    },
    comprovantestype:{
        type: Sequelize.STRING,
        allowNull: true
    },
    data:{
        type: Sequelize.BLOB('medium'),
        allowNull: true
    },
    cargaHorariatotal:{
        type: Sequelize.TINYINT,
        defaultValue: 0
    }
});

Docente.hasMany(PlanoTrabalho, {model:Docente});
PlanoTrabalho.belongsTo(Docente);

module.exports = PlanoTrabalho;