function docenteAuth(req, res, next){

    if(req.session.docente != undefined){
        next();
    }
    else{
        res.redirect("/login");
    }
}



module.exports = docenteAuth;