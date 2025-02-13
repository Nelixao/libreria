const bcrypt = require('bcrypt');
const saltRounds = 10;

app.post('/register', async (req, res) => {
  const { nombre, email, contraseña, rol } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(contraseña, saltRounds);
    const nuevoUsuario = await Usuario.create({ nombre, email, contraseña: hashedPassword, rol });

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});
