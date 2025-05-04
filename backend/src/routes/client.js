const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const clientController = require('../controllers/clientController');
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');

router.post(
  '/',
  auth,
  [
    body('name').notEmpty().withMessage('Nome é obrigatório'),
    body('email').isEmail().withMessage('E-mail inválido'),
    body('phone').optional().isMobilePhone('pt-BR').withMessage('Telefone inválido')
  ],
  clientController.create
);
router.get('/', auth, role('admin'), clientController.getAll);
router.get('/:id', auth, role('admin'), clientController.getById);
router.put('/:id', auth, role('admin'), clientController.update);
router.delete('/:id', auth, role('admin'), clientController.remove);

module.exports = router;
