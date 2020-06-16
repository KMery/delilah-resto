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
        amount: {
            type: type.FLOAT,
            defaultValue: 0.00
        },
        status: {
            type: type.STRING,
            defaultValue: "New"
        }  
    })
}