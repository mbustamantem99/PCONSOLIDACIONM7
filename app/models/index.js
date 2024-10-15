const { dbConfig, sequelize, Sequelize } = require('../config/db.config');  // Ajustar la ruta correcta a db.config
const UserModel = require('./user.model');       // No olvides pasar la función
const BootcampModel = require('./bootcamp.model');


// Crear la conexión a la base de datos usando Sequelize
// Ya no necesitas crear una nueva instancia de Sequelize, ya que la estás importando de db.config.js
// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//   host: dbConfig.HOST,
//   dialect: dbConfig.dialect,
//   pool: {
//     max: dbConfig.pool.max,
//     min: dbConfig.pool.min,
//     acquire: dbConfig.pool.acquire,
//     idle: dbConfig.pool.idle
//   }
// });

// Inicializar los modelos pasándoles la instancia de sequelize
const User = UserModel(sequelize, Sequelize.DataTypes);
const Bootcamp = BootcampModel(sequelize, Sequelize.DataTypes);

// Definir el objeto db para almacenar las conexiones
const db = {};

// Guardar Sequelize y sequelize dentro del objeto db
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = User;
db.Bootcamp = Bootcamp;

// Definir las relaciones entre los modelos (muchos a muchos)
db.User.belongsToMany(db.Bootcamp, { through: 'User Bootcamp', foreignKey: 'userId', otherKey: 'bootcampId' });
db.Bootcamp.belongsToMany(db.User, { through: 'User Bootcamp', foreignKey: 'bootcampId', otherKey: 'userId' });

// Exportar el objeto db
module.exports = db;