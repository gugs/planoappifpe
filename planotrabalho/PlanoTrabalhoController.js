const express = require("express");
const router = express();
const slugify = require("slugify");

const PlanoTrabalho = require("./planotrabalho");
const Docente = require("../docente/Docente");
const Disciplina = require("../disciplina/Disciplina");
const PlanoDisciplina = require("../planodisciplina/PlanoDisciplina");
const { type } = require("express/lib/response");

router.get("/planotrabalho/create", (req, res) => {
    Docente.findAll().then(docentes => {
        Disciplina.findAll().then(disciplinas => {
            PlanoTrabalho.findOne({
                order: [['id', 'DESC']],
            }).then(plano => {
                if (plano != undefined) {
                    res.render('planotrabalho/create', { docentes: docentes, disciplinas: disciplinas, plano: plano });
                }
                else {
                    var planoNovo = {
                        id: 0
                    }

                    res.render('planotrabalho/create', { docentes: docentes, disciplinas: disciplinas, plano: planoNovo });
                }

            });
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
    var planoId = req.body.planoId;


    try {
        PlanoTrabalho.create({
            docenteId: docenteId,
            ano: ano,
            semestre: semestre,
            grupo: grupo,
            observacoes: observacoes,
        }).then(() => {
            planoId++;
            selecaodisciplinas.forEach(d => {
                console.log(parseInt(d))
                PlanoDisciplina.create({
                    planotrabalhoId: (planoId),
                    disciplinaId: parseInt(d),
                    ano: ano
                });
            });
        });
    } catch (err) {
        console.log(err)
    }
});

router.get("/planotrabalho/index", (req, res) => {
    PlanoTrabalho.findAll().then(planos => {
        res.render("planotrabalho/index", { planos: planos });
    });
});

async function getLastId() {
    const id = await PlanoTrabalho.findOne({ order: [['id', 'DESC']], });
    id.then((ids) => {
        return ids;
    });
}

module.exports = router;
