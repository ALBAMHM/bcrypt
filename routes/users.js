const express=require('express')
const app=express()
import{users} from "./data/users.js"
import{generateToken,verifyToken} from "./middlewares/authMiddleware.js"

app.get('/', (req, res) => {
    const loginForm = `
    <form action="/login" method="post">
    <label for="username">Usuario:</label>
    <input type="text" id="username" name="username" required><br>
  
    <label for="password">Contraseña:</label>
    <input type="password" id="password" name="password" required><br>
  
    <button type="submit">Iniciar sesión</button>
    </form>
    <a href="/dashboard">dashboard</a>
    `;
    res.send(loginForm);
  });
  
  app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      const token = generateToken(user);
      req.session.token = token;
      res.redirect('/dashboard');
    } else {
      res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }
  });
  
  app.get('/dashboard', verifyToken, (req, res) => {
    const userId = req.user;
    const user = users.find((user) => user.id === userId);
    if (user) {
      res.send(`
      <h1>Bienvenido, ${user.name}</h1>
      <p>ID: ${user.id}</p>
      <p>UserName: ${user.username}</p>
      <a href='/'>HOME</a>
      <form action='/logout' method='post'>
      <button type='submit'>Cerrar sesión</button>
      </form>
  
      `);
    } else {
      res.status(401).json({ mensaje: 'Usuario no encontrado' });
    }
  });
  app.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
  });

  app.listen(port, () => {
    console.log(`Servidor en http://localhost:${port}`);
  });
  
  export{app}