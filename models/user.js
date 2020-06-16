module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
        nameUser: {
            type: type.STRING,
            primaryKey: true
        },
        admin: {
            type: type.BOOLEAN,
            defaultValue: false
        }, 
        adress: type.STRING,
        telephone: type.INTEGER,
        mail: type.STRING,
        password: type.STRING
    })
}