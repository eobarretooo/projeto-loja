const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/celularfix')
  .then(async () => {
    const User = require('./src/models/User');
    const users = await User.find({}, { email: 1, role: 1, _id: 0 });
    console.log('Usuários encontrados:\n', users);
    process.exit(0);
  })
  .catch(err => {
    console.error('Erro ao conectar ou buscar:', err);
    process.exit(1);
  });