const express = require("express");
const router = express();
const slugify = require("slugify");

const PlanoTrabalho = require("./planotrabalho");
const Docente = require("../docente/Docente");
const Disciplina = require("../disciplina/Disciplina");

router.get("/planotrabalho/create", (req, res) => {
    Docente.findAll().then(docentes => {
        Disciplina.findAll().then(disciplinas => {
            res.render("planotrabalho/create", { docentes: docentes, disciplinas: disciplinas });
        });
    });
});

router.post("/planotrabalho/create", (req, res) => {
    var nome = req.body.nome;
    var slug = slugify(nome);

    PlanoTrabalho.create({
        nome: nome,
        slug: slug
    }).then(() => {
        res.redirect("planotrabalho/index");
    });
});

router.get("/planotrabalho/index", (req, res) => {

    PlanoTrabalho.findAll().then(planos => {
        res.render("planotrabalho/index", { planos: planos });
    });
});

module.exports = router;
