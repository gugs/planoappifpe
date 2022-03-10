const express = require("express");
const router = express();
const slugify = require("slugify");
const adminAuth = require("../middleware/adminAuth");

const Disciplina = require("./Disciplina");

router.get("/admin/disciplina/create", adminAuth,(req,res)=>{
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

router.post("/admin/disciplina/delete", adminAuth, (req, res) => {

    var id = req.body.id;

    if (id != undefined) {
        if (!isNaN(id)) {
            Disciplina.destroy({ where: { id: id } }).then(() => {
                res.redirect("/admin/disciplina/index");
            });
        }
        else
            res.redirect("/admin/disciplina/index");
    }
});

router.get("/admin/disciplina/edit/:id", adminAuth, (req, res) => {
    var id = req.params.id;

    if (!isNaN(id)) {
        Disciplina.findOne({ where: { id: id } }).then(disciplina => {
            res.render("admin/disciplina/edit", { disciplina: disciplina });
        });
    }
    else
        res.redirect("/admin/disciplina/index");
});

router.post("/admin/disciplina/update", adminAuth, (req, res) => {

    var { id, nome, cargahorariaaula, cargahorariarelogio, tipo } = req.body;

    if (!isNaN(id)) {
        Disciplina.update({
            nome: nome,
            cargaHorariaAula: cargahorariaaula,
            cargaHorariaRelogio: cargahorariarelogio,
            tipo: tipo
        },
            {
                where: { id: id }
            }).then(() => {
                res.redirect("/admin/disciplina/index");
            });
    }
    else
        res.redirect("/admin/disciplina/index");
})



router.get("/admin/disciplina/index",adminAuth,(req,res)=>{

    Disciplina.findAll().then(disciplinas => {
        res.render("admin/disciplina/index", {disciplinas: disciplinas});
    });
});

module.exports = router;
