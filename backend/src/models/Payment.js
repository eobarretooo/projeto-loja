const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  repair: { type: mongoose.Schema.Types.ObjectId, ref: 'Repair', required: true },
  amount: { type: Number, required: true },
  method: { type: String, enum: ['Dinheiro', 'Cartão', 'Pix', 'Outro'], required: true },
  paid: { type: Boolean, default: false },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', PaymentSchema);
