const express = require('express');
const router = express.Router();

const stuffController = require('../controllers/stuff');

router.get('/', stuffController.getAllStuff);
router.post('/', stuffController.createThing);
router.get('/:id', stuffController.getOneThing);
router.put('/:id', stuffController.modifyThing);
router.delete('/:id', stuffController.deleteThing);

module.exports = router;