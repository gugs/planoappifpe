const express = require("express");
const router = express();
const slugify = require("slugify");
const bcrypt = require('bcryptjs');
const flash = require('express-flash');
const cookieParser = require('cookie-parser')

const Docente = require("./Docente");
const Coordenacao = require("../coordenacao/Coordenacao");
const adminAuth = require("../middleware/adminAuth");

router.get("/admin/docente/create", adminAuth, (req,res)=>{
    Coordenacao.findAll().then(coordenacoes=>{
        res.render("admin/docente/create",{coordenacoes:coordenacoes});
    });    
});

router.get("/admin/docente/index", adminAuth,(req,res)=>{
    Docente.findAll({include:{model:Coordenacao, as: "coordenacao"}}).then(docentes=>{
        res.render("admin/docente/index",{docentes:docentes});
    });    
});

router.post("/docente/create", adminAuth, (req,res)=>{

    var senha1 = req.body.senha1;
    var senha2 = req.body.senha2;
    var nome = req.body.nome;
    var siape = req.body.siape;
    var email = req.body.email;
    var regime = req.body.regime;
    var coordenacaoId = req.body.coordenacaoId;
    var admin = req.body.admin;

    var salt = bcrypt.genSaltSync(10);

    if(senha1 == senha2)
    {
        senha2 = bcrypt.hashSync(senha1, salt);

        Docente.create({
            nome: nome,
            siape: siape,
            email: email,
            regime:regime,
            coordenacaoId: coordenacaoId,
            senha: senha2,
            admin: admin
        }).then(()=>{
            res.redirect("/")
        });
    }
});


module.exports = router;