const express = require('express');
const router = express.Router();
const tutorialController = require('../controllers/tutorialController');
const { verifyToken } = require('../middleware/auth');

// publice 
router.get('/', tutorialController.getAll);
router.get('/:id', tutorialController.getById);

// protected 

router.post('/', verifyToken, tutorialController.create);
router.put('/:id', verifyToken, tutorialController.update);
router.delete('/:id', verifyToken, tutorialController.remove);
router.get('/user/me', verifyToken, tutorialController.getMine);

module.exports = router;