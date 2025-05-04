const { validationResult } = require('express-validator');
const StockItem = require('../models/StockItem');

exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const item = await StockItem.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar item de estoque.' });
  }
};

exports.list = async (req, res) => {
  try {
    const items = await StockItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao listar estoque.' });
  }
};

exports.update = async (req, res) => {
  try {
    const item = await StockItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: 'Item não encontrado.' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar item.' });
  }
};

exports.remove = async (req, res) => {
  try {
    const item = await StockItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item não encontrado.' });
    res.json({ message: 'Item removido.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao remover item.' });
  }
};
