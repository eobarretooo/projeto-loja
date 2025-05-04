const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');

// Registro
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Nome é obrigatório'),
    body('email').isEmail().withMessage('E-mail inválido'),
    body('password').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres'),
    // Só admin pode criar outro admin
    (req, res, next) => {
      if (req.body.role === 'admin') {
        return auth(req, res, () => role('admin')(req, res, next));
      }
      next();
    }
  ],
  userController.register
);
// Login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('E-mail inválido'),
    body('password').notEmpty().withMessage('Senha obrigatória')
  ],
  userController.login
);
// Perfil do usuário autenticado
router.get('/profile', auth, userController.profile);

module.exports = router;
