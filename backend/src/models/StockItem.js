const mongoose = require('mongoose');

const StockItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['peca', 'eletronico'], required: true },
  quantity: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true, min: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('StockItem', StockItemSchema);
