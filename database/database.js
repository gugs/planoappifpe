//carregando a lib de conexao com o bd
const Sequelize = require("sequelize");


// instanciando o sequelize. argumentos: nome do esquema, usuario, senha e o json com endereco e dialeto
const connection = new Sequelize('guiapress', 'root', 'root!@#', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

//exportando a conexao para que seja possivel importar a partir de outro arquivo - formato de modulo
module.exports = connection;