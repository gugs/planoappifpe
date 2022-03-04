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
    var docenteId = req.body.docenteId;
    var ano = req.body.ano;
    var semestre = req.body.semestre;
    var grupo = req.body.grupo;
    var observacoes = req.body.observacoes;
    var selecaodisciplinas = req.body.selecaodisciplinas;

    PlanoTrabalho.create({
        ano: ano,
        semestre: semestre,
        grupo: grupo,
        observacoes: observacoes,
        docenteId: docenteId,
    }).then(() => {
        res.redirect("/planotrabalho/create");
    });
});

router.get("/planotrabalho/index", (req, res) => {

    PlanoTrabalho.findAll().then(planos => {
        res.render("planotrabalho/index", { planos: planos });
    });
});

module.exports = router;
