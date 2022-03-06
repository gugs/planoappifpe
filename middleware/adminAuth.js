function adminAuth(req, res, next) {
    if (req.session.docente != undefined) {
        if (req.session.docente.admin == 1) {
            console.log("Entrou como admin!");
            next();
        }
        else
            res.redirect("/login");
    }
    else {
        res.redirect("/login");
    }
}

module.exports = adminAuth;