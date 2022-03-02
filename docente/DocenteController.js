const express = require("express");
const router = express();
const slugify = require("slugify");

const Docente = require("./Docente");

router.get("/admin/docente/create",(req,res)=>{
    res.render("admin/docente/create");
});

router.post("/admin/coordenacao/create",(req,res)=>{
    
});

router.get("/admin/coordenacao/index", (req,res)=>{

});

module.exports = router;