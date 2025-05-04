const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const stockController = require('../controllers/stockController');
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');

// Criar item de estoque (apenas admin)
router.post(
  '/',
  auth,
  role('admin'),
  [
    body('name').notEmpty().withMessage('Nome é obrigatório'),
    body('type').isIn(['peca', 'eletronico']).withMessage('Tipo deve ser "peca" ou "eletronico"'),
    body('quantity').isInt({ min: 0 }).withMessage('Quantidade deve ser um número inteiro >= 0'),
    body('price').isFloat({ min: 0 }).withMessage('Preço deve ser um número >= 0')
  ],
  stockController.create
);

// Listar estoque (apenas admin)
router.get('/', auth, role('admin'), stockController.list);

// Atualizar item de estoque (apenas admin)
router.put('/:id', auth, role('admin'), stockController.update);

// Remover item de estoque (apenas admin)
router.delete('/:id', auth, role('admin'), stockController.remove);

module.exports = router;
