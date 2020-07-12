const Sequelize = require('sequelize');
const PlatesModel = require('./models/plates');

const sequelize = new Sequelize('deliah', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

const Plates = PlatesModel(sequelize, Sequelize);

const Product = sequelize.define('product', {});

sequelize.sync({force: true})
    .then(() => {
        console.log('Tables were created!');
    });

module.exports = {
    Plates
}
