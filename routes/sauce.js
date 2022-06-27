//importation du package "express" et son router
const express = require('express');
const router = express.Router();

//importation des Middleware "auth.js" et "multer-config.js"
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')

//importation des controllers
const stuffCtrl = require('../controllers/sauce')

//Définition des router
router.post('/', auth, multer, stuffCtrl.createSauce);
router.put('/:id', auth, multer, stuffCtrl.modifySauce);
router.delete('/:id', auth, stuffCtrl.deleteSauce);
router.get('/:id', auth, stuffCtrl.getOneSauce);
router.get('/', auth, stuffCtrl.getAllSauces);
router.post('/:id/like', auth, stuffCtrl.createLike);

//export des router
module.exports = router;