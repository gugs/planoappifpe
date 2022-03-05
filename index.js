const express = require("express"); 
const app = express();
const port = 8080;

const Coordenacao = require("./coordenacao/Coordenacao");
const Docente = require("./docente/Docente");
const Disciplina = require("./disciplina/Disciplina");
const PlanoTrabalho = require("./planotrabalho/PlanoTrabalho");
const PlanoDisciplina = require("./planodisciplina/PlanoDisciplina");
const connection = require("./database/database");

const session = require("express-session");

Coordenacao.hasMany(Docente);
Docente.belongsTo(Coordenacao);

Docente.hasMany(PlanoTrabalho);
PlanoTrabalho.belongsTo(Docente);

PlanoTrabalho.belongsToMany(Disciplina, { through: PlanoDisciplina});
Disciplina.belongsToMany(PlanoTrabalho, { through: PlanoDisciplina});

connection.sync({force:false});

const coordenacaoController = require("./coordenacao/CoordenacaoController");
const docenteController = require("./docente/docenteController");
const disciplinaController = require("./disciplina/DisciplinaController");
const PlanoTrabalhoController = require("./planotrabalho/PlanoTrabalhoController");
//importando o modulo body parser (manipulador dos campos http)
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs/dist/bcrypt");

//set o body parser para manusear dados do form e de json
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//set basic settings to express session
app.use(session({
    secret: "meuapp",
    cookie:{maxAge: 3000000}
}));

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use("/",coordenacaoController);
app.use("/",docenteController);
app.use("/",disciplinaController);
app.use("/",PlanoTrabalhoController);

app.get("/", (req,res)=>{
    res.render("index");
});


app.get("/session", (req,res) =>{
    req.session.id = 1;
    req.session.siape = "299"
    req.session.admin = true;
});

app.get("/session-read", (req,res) =>{
    
});

app.get("/login",(req,res) =>{
    res.render('login/login');
});

app.post("/authenticate", (req,res)=>{
    var email = req.body.email;
    var senha = req.body.senha;

    Docente.findOne({where:{email:email}}).then(docente =>{
        if(docente != undefined)
        {
            var correct = bcrypt.compareSync(senha, docente.senha);
            if(correct){
                req.session.docente = {
                    id: docente.id,
                    email: docente.email
                }
                res.json(req.session.docente);
            }
            else
            {
                res.redirect('login');
            }
        }
        else{
            res.redirect('login');
        }
    }).catch(err=>{
        console.log(err);
    });
});

app.listen(port,()=>{
    console.log("servidor funcionando!");
});