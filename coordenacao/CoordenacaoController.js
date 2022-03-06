const express = require("express");
const router = express();
const slugify = require("slugify");

const adminAuth = require("../middleware/adminAuth");

const Coordenacao = require("./Coordenacao");

router.get("/admin/coordenacao/create", adminAuth,(req,res)=>{
    res.render("admin/coordenacao/create");
});

router.post("/admin/coordenacao/create",adminAuth,(req,res)=>{
    var nome = req.body.nome;
    var slug = slugify(nome);

    Coordenacao.create({
        nome: nome,
        slug: slug
    }).then(()=>{
        res.redirect("/admin/coordenacao/index");
    });
});

router.get("/admin/coordenacao/index", (req,res)=>{

    Coordenacao.findAll().then(coordenacoes => {
        res.render("admin/coordenacao/index", {coordenacoes: coordenacoes});
    });
});

module.exports = router;
