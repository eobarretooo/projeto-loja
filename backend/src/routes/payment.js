const express = require('express');
const router = express.Router();
const controller = require('../controllers/paymentController');
const auth = require('../middlewares/auth');

router.post('/', auth, controller.create);
router.get('/', auth, controller.getAll);
router.get('/:id', auth, controller.getById);
router.put('/:id', auth, controller.update);
router.delete('/:id', auth, controller.remove);

module.exports = router;
