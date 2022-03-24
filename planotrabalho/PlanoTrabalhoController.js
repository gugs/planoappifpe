const express = require("express");
const router = express();
const slugify = require("slugify");

const PlanoTrabalho = require("./planotrabalho");
const Docente = require("../docente/Docente");
const Disciplina = require("../disciplina/Disciplina");
const PlanoDisciplina = require("../planodisciplina/PlanoDisciplina");
const { type } = require("express/lib/response");

const docenteAuth = require("../middleware/docenteAuth");
const adminAuth = require("../middleware/adminAuth");

router.get("/planotrabalho/create", docenteAuth, (req, res) => {
    var sessionId = req.session.docente.id;

    Docente.findOne({ where: { id: sessionId } }).then(docente => {
        Disciplina.findAll().then(disciplinas => {
            PlanoTrabalho.findOne({
                order: [['id', 'DESC']],
            }).then(plano => {
                if (plano != undefined) {
                    res.render('planotrabalho/create', { docente: docente, disciplinas: disciplinas, plano: plano });
                }
                else {
                    var planoNovo = {
                        id: 0
                    }
                    res.render('planotrabalho/create', { docente: docente, disciplinas: disciplinas, plano: planoNovo });
                }

            });
        });
    });
});

router.get("/planotrabalho/edit/:id", docenteAuth, (req, res) => {
    var sessionId = req.session.docente.id;
    var planoId = req.params.id;


    Disciplina.findAll().then(disciplinas => {
        PlanoTrabalho.findOne({ where: { id: planoId } }).then(plano => {
            Docente.findOne({ where: { id: plano.docenteId } }).then(docente => {
                if (sessionId == docente.id) {
                    PlanoDisciplina.findAll({ where: { planotrabalhoId: plano.id } }).then(planodisciplinas => {
                        res.render('planotrabalho/edit', { plano: plano, docente: docente, disciplinas: disciplinas, planodisciplinas: planodisciplinas });
                    });
                }
                else
                    res.redirect('/logout');
            });
        });
    });
});


router.get("/planotrabalho/index", docenteAuth, (req, res) => {
    var sessionId = req.session.docente.id;
    sessionId = parseInt(sessionId);
    if (sessionId != undefined) {
        Docente.findOne({ where: { id: sessionId } }).then(docente => {
            PlanoTrabalho.findAll({ where: { docenteId: docente.id } }).then(planos => {
                res.render('planotrabalho/index', { planos: planos, docente: docente });
            });
        });
    }
});

router.get("/admin/planos/index", adminAuth, (req, res) => {

    PlanoTrabalho.findAll({include: {model: Docente, as:'docente'} }).then(planos=>{
        res.render("admin/planostrabalho/index", {planos:planos});
    });
});

router.post("/planotrabalho/delete", docenteAuth, (req, res) => {
    var sessionId = req.session.docente.id;
    var idPlano = req.body.id;

    PlanoTrabalho.findOne({ where: { id: idPlano } }).then(plano => {
        if (plano.docenteId == sessionId) {
            PlanoDisciplina.destroy({ where: { planotrabalhoId: plano.id } }).then(() => {
                PlanoTrabalho.destroy({ where: { id: plano.id } }).then(() => {
                    res.redirect("/planotrabalho/index");
                });
            });
        }
    });
});

router.post("/planotrabalho/create", docenteAuth, (req, res) => {
    var selecaodisciplinas = [];
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
            if (Array.isArray(selecaodisciplinas)) {
                selecaodisciplinas.forEach(d => {
                    console.log(parseInt(d))
                    PlanoDisciplina.create({
                        planotrabalhoId: (planoId),
                        disciplinaId: parseInt(d),
                        ano: ano
                    });
                });
                res.redirect("/planotrabalho/index");
            }
            else {
                PlanoDisciplina.create({
                    planotrabalhoId: (planoId),
                    disciplinaId: parseInt(d),
                    ano: ano
                });
                res.redirect("/planotrabalho/index");
            }
        });
    } catch (err) {
        console.log(err)
    }
});

module.exports = router;
