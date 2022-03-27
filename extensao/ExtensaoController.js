const express = require("express");
const router = express();
const slugify = require("slugify");
const bcrypt = require('bcryptjs');
const flash = require('express-flash');
const cookieParser = require('cookie-parser')

const Docente = require("../docente/Docente");
const Extensao = require("./Extensao");

const adminAuth = require("../middleware/adminAuth");
const docenteAuth = require("../middleware/docenteAuth");

router.get("/admin/extensao/create", adminAuth, (req, res) => {
    Docente.findAll().then(docentes => {
        res.render("admin/extensao/create", { docentes: docentes });
    });
});

router.get("/admin/extensao/index", adminAuth, (req, res) => {

    Extensao.findAll({ include: { model: Docente, as: "docente" } }).then(extensoes => {
        res.render("admin/extensao/index", { extensoes: extensoes });
    });
});

router.post("/admin/extensao/create", adminAuth, (req, res) => {

    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    var anoinicio = req.body.anoinicio;
    var anofim = req.body.anofim;
    var prorrogado = req.body.prorrogado;
    var docenteId = req.body.docenteId;
    var cargahoraria = req.body.cargahoraria;

    Extensao.create({
        titulo: titulo,
        descricao: descricao,
        anoinicio: anoinicio,
        anofim: anofim,
        prorrogado: prorrogado,
        cargahoraria: cargahoraria,
        docenteId: docenteId,
    }).then(() => {
        res.redirect("/admin/extensao/index")
    });
});

router.post("/admin/extensao/delete", adminAuth, (req, res) => {

    var id = req.body.id;

    if (id != undefined) {
        if (!isNaN(id)) {
            Extensao.destroy({ where: { id: id } }).then(() => {
                res.redirect("/admin/extensao/index");
            });
        }
        else
            res.redirect("/admin/extensao/index");
    }
});

router.post("/admin/extensao/update", adminAuth, (req, res) => {
    var id = req.body.id;
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    var anoinicio = req.body.anoinicio;
    var anofim = req.body.anofim;
    var prorrogado = req.body.prorrogado;
    var docenteId = req.body.docenteId;
    var cargahoraria = req.body.cargahoraria;

    if(!isNaN(id))
    {
        Extensao.update({
            titulo: titulo,
            descricao: descricao,
            anoinicio: anoinicio,
            anofim: anofim,
            prorrogado: prorrogado,
            cargahoraria: cargahoraria,
            docenteId: docenteId
        },{where:{id:id}}).then(()=>{
            res.redirect("/admin/extensao/index");
        });
    }
    else
        res.redirect("/admin/extensao/index");
});

router.get("/admin/extensao/edit/:id", adminAuth, (req, res) => {
    var id = req.params.id;

    if (!isNaN(id)) {
        Extensao.findOne({ where: { id: id }, include: { model: Docente, as: "docente" } }).then(extensao => {
            Docente.findAll().then(docentes => {
                res.render("admin/extensao/edit", { extensao: extensao, docentes: docentes });
            });
        });
    }
});


module.exports = router;