const http = require('http');
const { sequelize } = require('./app/models');
const bootcampController = require('./app/controllers/bootcamp.controller');
const userController = require('./app/controllers/user.controller');

// Función para manejar las rutas
const requestListener = async (req, res) => {
  if (req.url === '/users' && req.method === 'POST') {
    // Crear usuario
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', async () => {
      req.body = JSON.parse(body);
      await userController.createUser(req, res);
    });
  } else if (req.url.match(/^\/users\/(\d+)$/) && req.method === 'GET') {
    // Obtener usuario por ID
    const id = req.url.match(/^\/users\/(\d+)$/)[1];
    req.params = { id };
    await userController.findUserById(req, res);
  } else if (req.url === '/users' && req.method === 'GET') {
    // Obtener todos los usuarios
    await userController.findAll(req, res);
  } else if (req.url.match(/^\/bootcamps\/(\d+)$/) && req.method === 'GET') {
    // Obtener Bootcamp por ID
    const id = req.url.match(/^\/bootcamps\/(\d+)$/)[1];
    req.params = { id };
    await bootcampController.findById(req, res);
  } else if (req.url === '/bootcamps' && req.method === 'POST') {
    // Crear Bootcamp
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', async () => {
      req.body = JSON.parse(body);
      await bootcampController.createBootcamp(req, res);
    });
  } else if (req.url.match(/^\/bootcamps\/(\d+)$/) && req.method === 'PUT') {
    // Actualizar Bootcamp
    const id = req.url.match(/^\/bootcamps\/(\d+)$/)[1];
    req.params = { id };
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', async () => {
      req.body = JSON.parse(body);
      await bootcampController.updateBootcamp(req, res);
    });
  } else if (req.url.match(/^\/bootcamps\/(\d+)$/) && req.method === 'DELETE') {
    // Eliminar Bootcamp
    const id = req.url.match(/^\/bootcamps\/(\d+)$/)[1];
    req.params = { id };
    await bootcampController.deleteBootcamp(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Route not found');
  }
};

// Crear servidor HTTP
const server = http.createServer(requestListener);

// Sincronizar base de datos y levantar el servidor
sequelize.sync({ alter: true }).then(() => {
  server.listen(3000, () => {
    console.log('Server running on port 3000');
  });
});