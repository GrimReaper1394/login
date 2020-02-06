// manages connection to mysql server

const Sequelize = require('sequelize');
const UserModel = require('./models/user')

const sequelize = new Sequelize ('users' , 'root' , 'Thereisnospoon1990!', {
    host: 'localhost',
    dialect: 'mysql'
});

const User = UserModel(sequelize, Sequelize)

sequelize.sync()
.then(() => {
    console.log(`User db and user table have been created`)
})

module.exports = User