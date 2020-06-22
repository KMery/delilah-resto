module.exports = (sequelize, type) => {
    return sequelize.define('order', {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: type.INTEGER
        },
        description: {
            defaultValue: "",
            type: type.STRING 
        },
        quantity: {
            // defaultValue: 1,
            type: type.INTEGER
        },
        amount: {
            type: type.FLOAT,
            defaultValue: 0.00
        },
        status: {
            type: type.STRING,
            defaultValue: "New"
        },
        userId: {
            type: type.INTEGER,
        }  
    })
}