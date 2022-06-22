const usersCtrl = {};

const passport = require('passport');

const User = require('../models/User');

usersCtrl.renderSignUpForm = (req, res) => {
    res.render('users/signup');
};

usersCtrl.signup = async (req, res) => {
    const errors = [];
    const { name, email, password, confirm_password } = req.body;
    if (password != confirm_password) {
        errors.push({text: 'Las contraseñas no coinciden'});
    }
    if (password.length < 4) {
        errors.push({text: 'La contraseña debe tener por lo menos 4 Carácteres'})
    }
    if (errors.length > 0) {
        res.render('users/signup', {
            errors,
            name,
            email
        })
    } else {
        const emailUser = await User.findOne({email: email});
        if (emailUser) {
            req.flash('error_msg', 'El correo ingresado ya está en uso');
            res.redirect('/signup');
        } else {
            const newUser = new User({ name, email, password });
            newUser.password = await newUser.encryptPassword(password);
            newUser.rol = 'Cliente';
            await newUser.save();
            req.flash('success_msg', 'Has sido registrado');
            res.redirect('/signin');
        }
    }
};

usersCtrl.renderSigninForm = (req, res) => {
    res.render('users/signin');
}

usersCtrl.signin = passport.authenticate('local', {
    failureRedirect: '/signin',
    successRedirect: '/profile',
    failureFlash: true
});

usersCtrl.logout = (req, res, next) => {
    req.logout(function(err) {
      if (err) { return next(err); }
      req.flash('success_msg', 'Has cerrado sesión correctamente.');
      res.redirect('/signin');
    });
}

module.exports = usersCtrl;