const express = require("express");
const router = express();
const slugify = require("slugify");
const adminAuth = require("../middleware/adminAuth");

const Disciplina = require("./Disciplina");

router.get("/admin/disciplina/create",(req,res)=>{
    res.render("admin/disciplina/create");
});

router.post("/admin/disciplina/create", adminAuth, (req,res)=>{
    var nome = req.body.nome;
    var cargaHorariaAula = req.body.cargahorariaaula;
    var cargaHorariaRelogio = req.body.cargahorariarelogio;
    var tipo = req.body.tipo;
    var slug = slugify(nome);

    Disciplina.create({
        nome: nome,
        cargaHorariaAula: cargaHorariaAula,
        cargaHorariaRelogio: cargaHorariaRelogio,
        tipo: tipo,
        slug: slug
    }).then(()=>{
        res.redirect("/admin/disciplina/index");
    });
});

router.get("/admin/disciplina/index", (req,res)=>{

    Disciplina.findAll().then(disciplinas => {
        res.render("admin/disciplina/index", {disciplinas: disciplinas});
    });
});

module.exports = router;
