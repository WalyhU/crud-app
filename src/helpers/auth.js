const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'No autorizado');
    res.redirect('/signin');
}

helpers.isntAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'Sesión Iniciada');
    res.redirect('/notes');
}

module.exports = helpers;