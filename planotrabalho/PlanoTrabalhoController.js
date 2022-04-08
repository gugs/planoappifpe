
const dictValidation = {};
dictValidation[1] = "Validado";
dictValidation[2] = "Não validado";
dictValidation[3] = "Pendente";

const express = require("express");
const router = express();
const slugify = require("slugify");
const fs = require('fs');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + " - " + file.originalname);
    }
})

const upload = multer({ storage });

const PlanoTrabalho = require("../planotrabalho/PlanoTrabalho");
const Docente = require("../docente/Docente");
const Disciplina = require("../disciplina/Disciplina");
const PlanoDisciplina = require("../planodisciplina/PlanoDisciplina");
const { type } = require("express/lib/response");

const docenteAuth = require("../middleware/docenteAuth");
const adminAuth = require("../middleware/adminAuth");
const Extensao = require("../extensao/Extensao");
const PlanoExtensao = require("../planoextensao/PlanoExtensao");

router.get("/planotrabalho/create", docenteAuth, (req, res) => {
    var sessionId = req.session.docente.id;

    Docente.findOne({ where: { id: sessionId } }).then(docente => {
        Disciplina.findAll().then(disciplinas => {
            Extensao.findAll({ include: { model: Docente, as: "docente" } }).then(extensoes => {
                PlanoTrabalho.findOne({
                    order: [['id', 'DESC']],
                }).then(plano => {
                    if (plano != undefined) {
                        res.render('planotrabalho/create', { docente: docente, disciplinas: disciplinas, extensoes: extensoes, plano: plano });
                    }
                    else {
                        var planoNovo = {
                            id: 0
                        }
                        res.render('planotrabalho/create', { docente: docente, disciplinas: disciplinas, extensoes: extensoes, plano: planoNovo });
                    }
                });
            });
        });
    });
});

//Falta tratar o editavel do plano de trabalho
router.get("/planotrabalho/edit/:id", docenteAuth, (req, res) => {
    var sessionId = req.session.docente.id;
    var planoId = req.params.id;

    Extensao.findAll({ include: { model: Docente, as: "docente" } }).then(extensoes => {
        Disciplina.findAll().then(disciplinas => {
            PlanoTrabalho.findOne({ where: { id: planoId } }).then(plano => {
                Docente.findOne({ where: { id: plano.docenteId } }).then(docente => {
                    if (sessionId == docente.id) {
                        PlanoDisciplina.findAll({ where: { planotrabalhoId: plano.id } }).then(planodisciplinas => {
                            PlanoExtensao.findAll({ where: { planotrabalhoId: plano.id } }).then(planosextensao => {
                                res.render('planotrabalho/edit', {
                                    plano: plano, docente: docente, disciplinas: disciplinas,
                                    planodisciplinas: planodisciplinas, extensoes: extensoes, planosextensao: planosextensao
                                });
                            });
                        });
                    }
                    else
                        res.redirect('/logout');
                });
            });
        });
    });
});

router.get("/planotrabalho/view/:id", docenteAuth, (req, res) => {
    var planoId = req.params.id;

    Extensao.findAll({ include: { model: Docente, as: "docente" } }).then(extensoes => {
        Disciplina.findAll().then(disciplinas => {
            PlanoTrabalho.findOne({ where: { id: planoId } }).then(plano => {
                Docente.findOne({ where: { id: plano.docenteId } }).then(docente => {
                    PlanoDisciplina.findAll({ where: { planotrabalhoId: plano.id } }).then(planodisciplinas => {
                        PlanoExtensao.findAll({ where: { planotrabalhoId: plano.id } }).then(planosextensao => {
                            res.render('planotrabalho/view', {
                                plano: plano, docente: docente, disciplinas: disciplinas,
                                planodisciplinas: planodisciplinas, extensoes: extensoes, planosextensao: planosextensao
                            });
                        });
                    });
                });
            });
        });
    });
});

router.get("/admin/planotrabalho/view/:id", adminAuth, (req, res) => {
    var planoId = req.params.id;

    Extensao.findAll({ include: { model: Docente, as: "docente" } }).then(extensoes => {
        Disciplina.findAll().then(disciplinas => {
            PlanoTrabalho.findOne({ where: { id: planoId } }).then(plano => {
                Docente.findOne({ where: { id: plano.docenteId } }).then(docente => {
                    PlanoDisciplina.findAll({ where: { planotrabalhoId: plano.id } }).then(planodisciplinas => {
                        PlanoExtensao.findAll({ where: { planotrabalhoId: plano.id } }).then(planosextensao => {
                            res.render('admin/planostrabalho/view', {
                                plano: plano, docente: docente, disciplinas: disciplinas,
                                planodisciplinas: planodisciplinas, extensoes: extensoes, planosextensao: planosextensao
                            });
                        });
                    });
                });
            });
        });
    });
});

router.post("/admin/planostrabalho/validate", adminAuth, (req, res) => {
    var planoId = req.body.planoId;
    var procedimento = req.body.procedimento;
    const status = dictValidation[procedimento];

    if (status != undefined) {
        PlanoTrabalho.update({
            status: status,
            editable: (procedimento == 1 ? 0 : 1)
        }, {
            where: { id: planoId }
        }).then(() => {
            res.redirect("/admin/planos/index");
        });
    } else
        res.redirect("/admin/planos/index");
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

    PlanoTrabalho.findAll({ include: { model: Docente, as: 'docente' } }).then(planos => {
        res.render("admin/planostrabalho/index", { planos: planos });
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

router.get("/files/:filename", docenteAuth, (req, res) => {
    var filename = req.params.filename;

    if (filename != undefined) {
        const filePath = "uploads/" + filename;
        fs.access(filePath, fs.constants.F_OK, err => {
            console.log(`${filename} ${err ? "não existe" : "existe"}`);
        });
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(404, { "Content-type": "text/html" });
                res.end("<h1>Imagem nao encontrada </h1>");
            }
            else {
                res.writeHead(200, { "Content-type": "application/pdf" });
                res.end(content);
            }
        });
    }
});

router.post("/planotrabalho/create", upload.single("customFile"), docenteAuth, (req, res) => {
    var selecaodisciplinas = [].concat(req.body.selecaodisciplinas);
    var selecaoextensoes = (req.body.selecaoextensao != undefined ? [].concat(req.body.selecaoextensao) : undefined);
    var docenteId = req.body.docenteId;
    var ano = req.body.ano;
    var semestre = req.body.semestre;
    var grupo = req.body.grupo;
    var observacoes = req.body.observacoes;
    var planoId = req.body.planoId;
    var file = (req.file.filename == undefined ? "" : req.file.filename);

    try {
        PlanoTrabalho.create({
            docenteId: docenteId,
            ano: ano,
            semestre: semestre,
            grupo: grupo,
            observacoes: observacoes,
            comprovantespath: file
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
            if (selecaoextensoes != undefined) {
                selecaoextensoes.forEach(e => {
                    PlanoExtensao.create({
                        extensoId: parseInt(e),
                        ano: ano,
                        planotrabalhoId: planoId
                    }).then(() => {
                        res.redirect("/planotrabalho/index");
                    });
                });
            }
            else {
                res.redirect("/planotrabalho/index");
            }
        });
    } catch (err) {
        console.log(err)
    }
});

module.exports = router;
