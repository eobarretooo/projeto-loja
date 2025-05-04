const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');

router.put('/', auth, role('admin'), settingsController.update);

module.exports = router;
