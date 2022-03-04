const express = require("express"); 
const app = express();
const port = 8080;

const Coordenacao = require("./coordenacao/Coordenacao");
const Docente = require("./docente/Docente");
const Disciplina = require("./disciplina/Disciplina");
const PlanoTrabalho = require("./planotrabalho/PlanoTrabalho");
const connection = require("./database/database");

Coordenacao.hasMany(Docente);
Docente.belongsTo(Coordenacao);


Docente.hasMany(PlanoTrabalho);
PlanoTrabalho.belongsTo(Docente);

connection.sync({force:true});

const coordenacaoController = require("./coordenacao/CoordenacaoController");
const docenteController = require("./docente/docenteController");
const disciplinaController = require("./disciplina/DisciplinaController");
const PlanoTrabalhoController = require("./planotrabalho/PlanoTrabalhoController");
//importando o modulo body parser (manipulador dos campos http)
const bodyParser = require("body-parser");

//set o body parser para manusear dados do form e de json
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use("/",coordenacaoController);
app.use("/",docenteController);
app.use("/",disciplinaController);
app.use("/",PlanoTrabalhoController);

app.get("/", (req,res)=>{
    res.render("index");
});


app.listen(port,()=>{
    console.log("servidor funcionando!");
});