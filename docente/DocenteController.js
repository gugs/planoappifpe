const express = require("express");
const router = express();
const slugify = require("slugify");
const bcrypt = require('bcryptjs');
const flash = require('express-flash');
const cookieParser = require('cookie-parser')

const Docente = require("./Docente");
const Coordenacao = require("../coordenacao/Coordenacao");
const adminAuth = require("../middleware/adminAuth");
const docenteAuth = require("../middleware/docenteAuth");

router.get("/admin/docente/create", adminAuth, (req, res) => {
    Coordenacao.findAll().then(coordenacoes => {
        res.render("admin/docente/create", { coordenacoes: coordenacoes });
    });
});

router.get("/admin/docente/index", adminAuth, (req, res) => {

    Docente.findAll({ include: { model: Coordenacao, as: "coordenacao" } }).then(docentes => {
        res.render("admin/docente/index", { docentes: docentes });
    });


});

router.get("/docente/edit", docenteAuth, (req, res) => {
    var idSession = req.session.docente.id;
    if(idSession != undefined)
    {
        Docente.findOne({where:{id:idSession}, include:{model:Coordenacao, as: "coordenacao"}}).then(docente=>{
            Coordenacao.findAll().then(coordenacoes=>{
                res.render("docente/edit",{docente:docente, coordenacoes:coordenacoes});
            });
        });
    }
});

router.get("/admin/docente/edit/:id", adminAuth, (req, res) => {
    var id = req.params.id;

    if(!isNaN(id))
    {
        Docente.findOne({where:{id:id}, include:{model:Coordenacao, as: "coordenacao"}}).then(docente=>{
            Coordenacao.findAll().then(coordenacoes=>{
                res.render("admin/docente/edit",{docente:docente, coordenacoes:coordenacoes});
            });
        });
    }
});

router.post("/admin/docente/delete", adminAuth, (req, res) => {

    var id = req.body.id;

    if (id != undefined) {
        if (!isNaN(id)) {
            Docente.destroy({ where: { id: id } }).then(() => {
                res.redirect("/admin/docente/index");
            });
        }
        else
            res.redirect("/admin/docente/index");
    }
});

router.post("/docente/update", docenteAuth, (req, res) => {
    var idSession = req.session.docente.id;
    var {id,email,senhaantiga, senha1,senha2} = req.body;
    var salt = bcrypt.genSaltSync(10);

    if(idSession == id)
    {
        Docente.findOne({where:{id:id}}).then(docente=>{
            if(bcrypt.compareSync(senhaantiga, docente.senha))
            {
                if(senha1 == senha2)
                {
                    Docente.update({
                        email: email,
                        senha: bcrypt.hashSync(senha1,salt)
                    },
                    {
                        where:{id:id}
                    }).then(()=>{
                        res.redirect("/planotrabalho/index");
                    });
                }
            }
        });
    }

    

    
});


router.post("/docente/create", adminAuth, (req, res) => {

    var senha1 = req.body.senha1;
    var senha2 = req.body.senha2;
    var nome = req.body.nome;
    var siape = req.body.siape;
    var email = req.body.email;
    var regime = req.body.regime;
    var coordenacaoId = req.body.coordenacaoId;
    var admin = req.body.admin;

    var salt = bcrypt.genSaltSync(10);

    if (senha1 == senha2) {
        senha2 = bcrypt.hashSync(senha1, salt);

        Docente.create({
            nome: nome,
            siape: siape,
            email: email,
            regime: regime,
            coordenacaoId: coordenacaoId,
            senha: senha2,
            admin: admin
        }).then(() => {
            res.redirect("/admin/docente/index")
        });
    }
});


module.exports = router;