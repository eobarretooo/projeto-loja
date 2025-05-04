const Settings = require('../models/Settings');

exports.update = async (req, res) => {
  try {
    const settings = await Settings.findOneAndUpdate({}, req.body, { new: true });
    if (!settings) return res.status(404).json({ message: 'Configurações não encontradas.' });
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar configurações.' });
  }
};

