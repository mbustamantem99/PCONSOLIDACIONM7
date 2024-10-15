const { Sequelize } = require('sequelize');

const dbConfig = {
  HOST: 'localhost',
  USER: 'postgres',
  PASSWORD: 'm4tuch0x',
  DB: 'db_bootcamp',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: dbConfig.pool
});

// Intentar autenticarse y mostrar un mensaje en caso de éxito o error
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente!!!!.');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

module.exports = {
  sequelize,
  Sequelize,
  dbConfig
};