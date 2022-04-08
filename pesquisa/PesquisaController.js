const express = require("express");
const router = express();
const slugify = require("slugify");
const bcrypt = require('bcryptjs');
const flash = require('express-flash');
const cookieParser = require('cookie-parser')

const Docente = require("../docente/Docente");
const Pesquisa = require("./Pesquisa");

const adminAuth = require("../middleware/adminAuth");
const docenteAuth = require("../middleware/docenteAuth");

router.get("/admin/pesquisa/create", adminAuth, (req, res) => {
    Docente.findAll().then(docentes => {
        res.render("admin/pesquisa/create", { docentes: docentes });
    });
});

router.get("/admin/pesquisa/index", adminAuth, (req, res) => {

    Pesquisa.findAll({ include: { model: Docente, as: "docente" } }).then(pesquisas => {
        res.render("admin/pesquisa/index", { pesquisas: pesquisas });
    });
});

router.post("/admin/pesquisa/create", adminAuth, (req, res) => {

    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    var anoinicio = req.body.anoinicio;
    var anofim = req.body.anofim;
    var prorrogado = req.body.prorrogado;
    var docenteId = req.body.docenteId;
    var cargahoraria = req.body.cargahoraria;

    Pesquisa.create({
        titulo: titulo,
        descricao: descricao,
        anoinicio: anoinicio,
        anofim: anofim,
        prorrogado: prorrogado,
        cargahoraria: cargahoraria,
        docenteId: docenteId,
    }).then(() => {
        res.redirect("/admin/pesquisa/index")
    });
});

router.post("/admin/pesquisa/delete", adminAuth, (req, res) => {

    var id = req.body.id;

    if (id != undefined) {
        if (!isNaN(id)) {
            Pesquisa.destroy({ where: { id: id } }).then(() => {
                res.redirect("/admin/pesquisa/index");
            });
        }
        else
            res.redirect("/admin/pesquisa/index");
    }
});

router.post("/admin/pesquisa/update", adminAuth, (req, res) => {
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
        Pesquisa.update({
            titulo: titulo,
            descricao: descricao,
            anoinicio: anoinicio,
            anofim: anofim,
            prorrogado: prorrogado,
            cargahoraria: cargahoraria,
            docenteId: docenteId
        },{where:{id:id}}).then(()=>{
            res.redirect("/admin/pesquisa/index");
        });
    }
    else
        res.redirect("/admin/pesquisa/index");
});

router.get("/admin/pesquisa/edit/:id", adminAuth, (req, res) => {
    var id = req.params.id;

    if (!isNaN(id)) {
        Pesquisa.findOne({ where: { id: id }, include: { model: Docente, as: "docente" } }).then(pesquisa => {
            Docente.findAll().then(docentes => {
                res.render("admin/pesquisa/edit", { pesquisa: pesquisa, docentes: docentes });
            });
        });
    }
});


module.exports = router;