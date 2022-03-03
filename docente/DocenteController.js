const express = require("express");
const router = express();
const slugify = require("slugify");
const bcrypt = require('bcryptjs');

const Docente = require("./Docente");
const Coordenacao = require("../coordenacao/Coordenacao");

router.get("/admin/docente/create",(req,res)=>{
    Coordenacao.findAll().then(coordenacoes=>{
        res.render("admin/docente/create",{coordenacoes:coordenacoes});
    });    
});

router.post("/docente/create",(req,res)=>{

    var senha1 = req.body.senha1;
    var senha2 = req.body.senha2;
    var nome = req.body.nome;
    var siape = req.body.siape;
    var email = req.body.email;
    var regime = req.body.regime;
    var salt = bcrypt.genSaltSync(10);

    if(senha1 == senha2)
    {
        senha2 = bcrypt.hashSync(senha1, salt);

        Docente.create({
            nome: nome,
            siape: siape,
            email: email,
            regime:regime,
            senha: senha2
        }).then(()=>{
            res.redirect("/")
        });
    }
});


module.exports = router;