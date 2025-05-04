const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/celularfix')
  .then(async () => {
    const User = require('./src/models/User');
    const res = await User.updateOne(
      { email: 'admin@admin.com' },
      { $set: { role: 'admin' } }
    );
    console.log('Resultado da atualização:', res);
    process.exit(0);
  })
  .catch(err => {
    console.error('Erro ao conectar ou atualizar:', err);
    process.exit(1);
  });
