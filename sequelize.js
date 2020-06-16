const Sequelize = require('sequelize');
const UserModel = require('./models/user');
const OrderModel = require('./models/order');
const PlatesModel = require('./models/plates');

const sequelize = new Sequelize('deliah', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

const User = UserModel(sequelize, Sequelize);
const Plates = PlatesModel(sequelize, Sequelize);
const Order = OrderModel(sequelize, Sequelize);



// const Product = sequelize.define('product', {});

const Product = sequelize.define('product', {});

// Product.init({
    // title: Sequelize.STRING
//   }, { sequelize, modelName: 'product' });

Order.belongsTo(User);

// Order.belongsTo(User, {foreignKey: {
//     name: 'id'
//     // allowNull: false
// }});

Order.belongsToMany(Plates, { through: Product, unique: false });

sequelize.sync({force: true})
    .then(() => {
        console.log('Tables were created!');
    });

module.exports = {
    User,
    Plates,
    Order
}
