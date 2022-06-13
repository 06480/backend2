const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/sauce')

router.post('/', stuffCtrl.createSauce);
router.put('/:id', stuffCtrl.modifySauce);
router.delete('/:id', stuffCtrl.deleteSauce);
router.get('/:id', stuffCtrl.getOneSauce);
router.get('/', stuffCtrl.getAllSauces);

module.exports = router;