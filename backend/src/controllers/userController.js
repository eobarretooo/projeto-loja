const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Função para gerar token JWT
const generateToken = (user) => {
  // Log para depuração do token
  console.log('Gerando token para usuário:', {
    id: user._id,
    email: user.email,
    role: user.role
  });
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'segredo123',
    { expiresIn: '7d' }
  );
};

const { validationResult } = require('express-validator');

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let { name, email, password, role } = req.body;
    console.log("Recebido para cadastro:", { name, email, role });
    if (!name || !email || !password) {
      console.log("Faltando campos obrigatórios");
      return res.status(400).json({ message: 'Preencha todos os campos.' });
    }
    if (role === 'admin') {
      // Só um admin autenticado pode criar outro admin
      if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Apenas administradores podem criar outros admins.' });
      }
    }
    if (!role) role = 'admin'; // Garante valor padrão
    const existing = await User.findOne({ email });
    if (existing) {
      console.log("E-mail já cadastrado:", email);
      return res.status(409).json({ message: 'E-mail já cadastrado.' });
    }
    const user = await User.create({ name, email, password, role });
    console.log("Usuário criado:", user);
    const token = generateToken(user);
    res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });
  } catch (err) {
    console.error("Erro ao registrar usuário:", err);
    res.status(500).json({ message: 'Erro ao registrar usuário.' });
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Preencha todos os campos.' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }
    // Log para depuração do login
    console.log('Login bem-sucedido, usuário:', { email: user.email, role: user.role });
    const token = generateToken(user);
    res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });
  } catch (err) {
    console.error("Erro ao fazer login:", err);
    res.status(500).json({ message: 'Erro ao fazer login.' });
  }
};

exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar perfil.' });
  }
};
