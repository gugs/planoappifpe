const express = require("express");
const router = express();
const slugify = require("slugify");

const adminAuth = require("../middleware/adminAuth");

const Coordenacao = require("./Coordenacao");

router.get("/admin/coordenacao/create", adminAuth, (req, res) => {
    res.render("admin/coordenacao/create");
});

router.post("/admin/coordenacao/create", adminAuth, (req, res) => {
    var nome = req.body.nome;
    var slug = slugify(nome);

    Coordenacao.create({
        nome: nome,
        slug: slug
    }).then(() => {
        res.redirect("/admin/coordenacao/index");
    });
});

router.get("/admin/coordenacao/index", adminAuth, (req, res) => {

    Coordenacao.findAll().then(coordenacoes => {
        res.render("admin/coordenacao/index", { coordenacoes: coordenacoes });
    });
});

router.post("/admin/coordenacao/update", adminAuth, (req, res) => {

    var { id, nome } = req.body;

    if (!isNaN(id)) {
        Coordenacao.update({
            nome: nome
        },
            {
                where: { id: id }
            }).then(() => {
                res.redirect("/admin/coordenacao/index");
            });
    }
    else
        res.redirect("/admin/coordenacao/index");
})

router.get("/admin/coordenacao/edit/:id", adminAuth, (req, res) => {
    var id = req.params.id;

    if (!isNaN(id)) {
        Coordenacao.findOne({ where: { id: id } }).then(coordenacao => {
            res.render("admin/coordenacao/edit", { coordenacao: coordenacao });
        });
    }
    else
        res.redirect("/admin/coordenacao/index");
});

router.post("/admin/coordenacao/delete", adminAuth, (req, res) => {

    var id = req.body.id;

    if (id != undefined) {
        if (!isNaN(id)) {
            Coordenacao.destroy({ where: { id: id } }).then(() => {
                res.redirect("/admin/coordenacao/index");
            });
        }
        else
            res.redirect("/admin/coordenacao/index");
    }
});

module.exports = router;
