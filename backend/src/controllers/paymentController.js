const Payment = require('../models/Payment');

exports.create = async (req, res) => {
  try {
    const payment = await Payment.create(req.body);
    res.status(201).json(payment);
  } catch (err) {
    res.status(400).json({ message: 'Erro ao registrar pagamento.' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const payments = await Payment.find().populate({ path: 'repair', populate: { path: 'client' } });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar pagamentos.' });
  }
};

exports.getById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate({ path: 'repair', populate: { path: 'client' } });
    if (!payment) return res.status(404).json({ message: 'Pagamento não encontrado.' });
    res.json(payment);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar pagamento.' });
  }
};

exports.update = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!payment) return res.status(404).json({ message: 'Pagamento não encontrado.' });
    res.json(payment);
  } catch (err) {
    res.status(400).json({ message: 'Erro ao atualizar pagamento.' });
  }
};

exports.remove = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) return res.status(404).json({ message: 'Pagamento não encontrado.' });
    res.json({ message: 'Pagamento removido.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao remover pagamento.' });
  }
};
