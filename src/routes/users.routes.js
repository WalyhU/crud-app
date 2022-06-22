const { Router } = require('express');
const router = Router();

const { renderSignUpForm,
    renderSigninForm,
    signup,
    signin,
    logout
} = require('../controllers/users.controller');

const { isntAuthenticated } = require ('../helpers/auth');

router.get('/signup', isntAuthenticated, renderSignUpForm);

router.post('/signup', isntAuthenticated, signup);

router.get('/signin', isntAuthenticated, renderSigninForm);

router.post('/signin', isntAuthenticated, signin);

router.get('/logout', logout);

module.exports = router;