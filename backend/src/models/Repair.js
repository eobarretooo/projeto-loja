const mongoose = require('mongoose');

const RepairSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  device: { type: String, required: true },
  status: { type: String, enum: ['Aguardando', 'Aguardando Peças', 'Em Andamento', 'Concluído'], default: 'Aguardando' },
  description: { type: String },
  price: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Repair', RepairSchema);
