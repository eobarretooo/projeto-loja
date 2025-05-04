const Client = require('../models/Client');

const { validationResult } = require('express-validator');

exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const client = await Client.create(req.body);
    res.status(201).json(client);
  } catch (err) {
    res.status(400).json({ message: 'Erro ao criar cliente.' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar clientes.' });
  }
};

exports.getById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ message: 'Cliente não encontrado.' });
    res.json(client);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar cliente.' });
  }
};

exports.update = async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!client) return res.status(404).json({ message: 'Cliente não encontrado.' });
    res.json(client);
  } catch (err) {
    res.status(400).json({ message: 'Erro ao atualizar cliente.' });
  }
};

exports.remove = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) return res.status(404).json({ message: 'Cliente não encontrado.' });
    res.json({ message: 'Cliente removido.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao remover cliente.' });
  }
};
