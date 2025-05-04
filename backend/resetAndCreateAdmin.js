const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const email = 'admin@admin.com';
const password = 'admin123'; // Altere se quiser
const name = 'Administrador';

mongoose.connect('mongodb://localhost:27017/celularfix')
  .then(async () => {
    const User = require('./src/models/User');
    // Apaga todos os admins existentes com esse e-mail
    await User.deleteMany({ email });
    console.log('Admins antigos removidos!');
    // Cria o novo admin
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });
    console.log('Novo admin criado:', { email: user.email, role: user.role });
    process.exit(0);
  })
  .catch(err => {
    console.error('Erro ao resetar/criar admin:', err);
    process.exit(1);
  });
