module.exports = (sequelize, type) => {
    return sequelize.define('plate', {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: type.INTEGER
        },
        plate: {
            primaryKey: true,
            type: type.STRING
        },
        price: type.FLOAT 
    })
}