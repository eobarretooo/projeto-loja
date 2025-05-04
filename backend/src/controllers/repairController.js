const Repair = require('../models/Repair');

exports.create = async (req, res) => {
  try {
    const repair = await Repair.create(req.body);
    res.status(201).json(repair);
  } catch (err) {
    res.status(400).json({ message: 'Erro ao criar conserto.' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const repairs = await Repair.find().populate('client', 'name email');
    res.json(repairs);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar consertos.' });
  }
};

exports.getById = async (req, res) => {
  try {
    const repair = await Repair.findById(req.params.id).populate('client', 'name email');
    if (!repair) return res.status(404).json({ message: 'Conserto não encontrado.' });
    res.json(repair);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar conserto.' });
  }
};

exports.update = async (req, res) => {
  try {
    const repair = await Repair.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!repair) return res.status(404).json({ message: 'Conserto não encontrado.' });
    res.json(repair);
  } catch (err) {
    res.status(400).json({ message: 'Erro ao atualizar conserto.' });
  }
};

exports.remove = async (req, res) => {
  try {
    const repair = await Repair.findByIdAndDelete(req.params.id);
    if (!repair) return res.status(404).json({ message: 'Conserto não encontrado.' });
    res.json({ message: 'Conserto removido.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao remover conserto.' });
  }
};
