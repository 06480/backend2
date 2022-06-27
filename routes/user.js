//importation du package "express" et son router
const express = require('express');
const router = express.Router();

//importation des controllers
const userCtrl = require('../controllers/user');

//Définition des router
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

//export des router
module.exports = router;