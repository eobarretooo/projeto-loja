const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const email = 'admin@admin.com';
const password = 'admin123'; // Você pode trocar por outra senha
const name = 'Administrador';

mongoose.connect('mongodb://localhost:27017/celularfix')
  .then(async () => {
    const User = require('./src/models/User');
    // Remove usuário admin antigo
    await User.deleteOne({ email });
    // Cria novo usuário admin
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash, role: 'admin' });
    console.log('Usuário admin recriado:', { email: user.email, role: user.role });
    process.exit(0);
  })
  .catch(err => {
    console.error('Erro ao resetar admin:', err);
    process.exit(1);
  });
