const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/sauce')
const multer = require('../middleware/multer-config')

router.post('/', multer, stuffCtrl.createSauce);
router.put('/:id', multer, stuffCtrl.modifySauce);
router.delete('/:id', stuffCtrl.deleteSauce);
router.get('/:id', stuffCtrl.getOneSauce);
router.get('/', stuffCtrl.getAllSauces);

module.exports = router;