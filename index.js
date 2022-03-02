const express = require("express"); 
const app = express();
const port = 8080;

const coordenacaoController = require("./coordenacao/CoordenacaoController");
const docenteController = require("./docente/docenteController");
//importando o modulo body parser (manipulador dos campos http)
const bodyParser = require("body-parser");

//set o body parser para manusear dados do form e de json
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use("/",coordenacaoController);
app.use("/",docenteController);

app.get("/", (req,res)=>{
    res.render("index");
});

app.listen(port,()=>{
    console.log("servidor funcionando!");
});