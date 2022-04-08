const express = require("express");
const app = express();
const port = 8080;

const Coordenacao = require("./coordenacao/Coordenacao");
const PlanoTrabalho = require("./planotrabalho/PlanoTrabalho");
const Docente = require("./docente/Docente");
const Disciplina = require("./disciplina/Disciplina");
const Extensao = require("./extensao/Extensao");
const Pesquisa = require("./pesquisa/Pesquisa");
const PlanoDisciplina = require("./planodisciplina/PlanoDisciplina");
const PlanoExtensao = require("./planoextensao/PlanoExtensao");
const PlanoPesquisa = require("./planopesquisa/PlanoPesquisa");
const connection = require("./database/database");

const session = require("express-session");

Coordenacao.hasMany(Docente);
Docente.belongsTo(Coordenacao);

Extensao.belongsTo(Docente);
Pesquisa.belongsTo(Docente);

PlanoTrabalho.belongsToMany(Disciplina, { through: PlanoDisciplina });
Disciplina.belongsToMany(PlanoTrabalho, { through: PlanoDisciplina });

Extensao.belongsToMany(PlanoTrabalho, { through: PlanoExtensao });
PlanoTrabalho.belongsToMany(Extensao, { through: PlanoExtensao });

Pesquisa.belongsToMany(PlanoTrabalho, { through: PlanoPesquisa });
PlanoTrabalho.belongsToMany(Pesquisa, { through: PlanoPesquisa });


connection.sync({ force: false });

//Realizando um teste

const coordenacaoController = require("./coordenacao/CoordenacaoController");
const docenteController = require("./docente/docenteController");
const disciplinaController = require("./disciplina/DisciplinaController");
const PlanoTrabalhoController = require("./planotrabalho/PlanoTrabalhoController");
const extensaoController = require("./extensao/ExtensaoController");
const pesquisaController = require("./pesquisa/PesquisaController");


//importando o modulo body parser (manipulador dos campos http)
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs/dist/bcrypt");
const { default: slugify } = require("slugify");

//set o body parser para manusear dados do form e de json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//set basic settings to express session
app.use(session({
    secret: "meuapp",
    cookie: { maxAge: 3000000 }
}));

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use("/", coordenacaoController);
app.use("/", docenteController);
app.use("/", disciplinaController);
app.use("/", PlanoTrabalhoController);
app.use("/", extensaoController);
app.use("/", pesquisaController);

app.get("/", (req, res) => {
    res.render("login/login");
});


app.get("/session-read", (req, res) => {

});

app.get("/login", (req, res) => {
    res.render('login/login');
});

app.post("/authenticate", (req, res) => {
    var email = req.body.email;
    var senha = req.body.senha;

    Docente.findOne({ where: { email: email } }).then(docente => {
        if (docente != undefined) {
            var correct = bcrypt.compareSync(senha, docente.senha);
            if (correct) {
                req.session.docente = {
                    id: docente.id,
                    email: docente.email,
                    admin: docente.admin
                }
                res.redirect('/planotrabalho/index');
            }
            else {
                res.redirect('login');
            }
        }
        else {
            res.redirect('login');
        }
    }).catch(err => {
        console.log(err);
    });
});

app.get("/logout", (req, res) => {
    req.session.docente = undefined;
    res.redirect("login");
});

app.get("/init", (req, res) => {

    try {
        Coordenacao.create({
            nome: "Coordenação Teste",
            slug: slugify("Coordenação Teste")
        }).then(() => {
            var salt = bcrypt.genSaltSync(10);
            Docente.create({
                siape: '1000001',
                nome: 'Conta Admin',
                regime: 1,
                email: 'admin@ifpe.com.br',
                senha: bcrypt.hashSync('123', salt),
                admin: 1,
                coordenacaoId: 1
            }).then(() => {
                res.redirect("login");
            });
        });
    } catch (error) {
        console.log(error);
    }
});

app.listen(port, () => {
    console.log("servidor funcionando!");
});