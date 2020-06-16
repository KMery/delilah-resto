require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const {User, Plates, Order} = require('./sequelize');
const jwt = require('jsonwebtoken');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}))

//Checks if the user is admin
function isAdmin(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    const bearer = bearerHeader.split(" ");
    const bearerAuth = bearer[1];
    var decoded = jwt.decode(bearerAuth, process.env.ACCESS_TOKEN_SECRET);
    // console.log('admin:', decoded.admin);
    if (decoded.admin !== true) {
        return res.status(403).send('Access denied. Admin role required');
    } else {
        next();
    }
}

//Check if token is correct
function authToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify(bearerToken, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
            if (err) {
                return res.status(403).json({
                    errorMessage: err
                });
            } else {
                next();
            }
        })
    } else {
        return res.sendStatus(403);
    }
}

//Let the users log
app.post('/login', async (req, res) => {
    const username = req.body.name;
    const password = req.body.password;
    const user = await User.findOne({
        where : {
            nameUser: username,
            password: password
        }
    });
    if (user== null) {
        // console.log('user not found');
        return res.status(400).send('Cannot find user');
    } else {
        // console.log(user, 'is_admin:', user.admin);
        const token = jwt.sign({username, admin: user.admin}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.TOKEN_EXPIRATION});
        res.json({
            userId: user.id,
            userName: username,
            accessToken: token,
            isAdmin: token.admin
        })
    }
});

//Create an user, by deafault are all common users
app.post('/users', async (req, res) => {
    if (!req.body.nameUser || !req.body.password) {
        return res.status(400).send('You must enter username and password')
    } else {
        User.create(req.body)
        .then(user => res.json(user))    
    }
})

//Let the admin get all the created users 
app.get('/users', [authToken, isAdmin], (req, res) => {
    User.findAll().then(users => res.json(users))
})

//Let the admin find an user
app.get('/users/:idUser', [authToken, isAdmin], (req, res) => {
    User.findOne({
        where: {
            id: req.params.idUser
        }
    }).then(user => res.json(user));
})

// Update user by id, only the owner can change values
app.put('/users/:idUser', authToken, (req, res) => {
    const bearerHeader = req.headers['authorization'];
    const bearer = bearerHeader.split(" ");
    const bearerAuth = bearer[1];
    var decoded = jwt.decode(bearerAuth, process.env.ACCESS_TOKEN_SECRET);
    // console.log('admin:', decoded.username);
    User.update({
        nameUser: req.body.name,
        adress: req.body.adress,
        telephone: req.body.telephone,
        mail: req.body.mail,
        password: req.body.password
        }, {where: {
            id: req.params.idUser, 
            nameUser: decoded.username
        }}
    ).then(function(rowsUpdated) {
        res.json({
            rowsUpdated: rowsUpdated
        })
      })
})

// Delete an user. Just for admin role
app.delete('/users/:idUser', [authToken, isAdmin], (req, res) => {
    try {
        User.destroy({
            where: {
                id: req.params.idUser
            }
        }).then(user => {
            res.json({
                rowsDeleted: user
            })
        })    
    } catch (err) {
        return res.status(401).send('Access denied. Contact the admin')
    }
})

// Get all the plates
app.get('/plates', authToken, (req, res) => {
    Plates.findAll().then(plates => res.json(plates));
})

// Add a new plate
app.post('/plates', [authToken, isAdmin], (req, res) => {
    // console.log(req.body);
    Plates.create(req.body)
        .then(plate => res.json(plate)); 
})

// Find plate by id
app.get('/plates/:idPlate', authToken, (req, res) => {
    Plates.findOne({
        where: {
            id: req.params.idPlate
        }
    }).then(plate => res.json(plate));
})

// Update plate by id
app.put('/plates/:idPlate', [authToken, isAdmin], (req, res) => {
    // console.log(req.body);
    Plates.update({
        plate: req.body.plate,
        price: req.body.price
        }, {where: {
            id: req.params.idPlate
        }}
        ).then(function(rowsUpdated) {
        res.json({
            rowsUpdated: rowsUpdated,
            message: 'Plate was updated'
        })
    })
});

// Delete a plate by id
app.delete('/plates/:idPlate', [authToken, isAdmin], (req, res) => {
    Plates.destroy({
        where: {
            id: req.params.idPlate
        }
    })
})

// Get a new order id
app.post('/order/new', authToken, (req, res) => {

    Order.create(req.body)
        .then(order => res.status(200).json({
            // user: decoded.username, 
            order
            })
        )
});

//Middleware to check if there is only one plate in description
function isOnePlate(req, res, next) {
    if (!req.body.description) {
        return res.status(400).send('You need to add a plate to the description')
    } else if (req.body.description) {
        var plates = req.body.description.split(",")
        if (plates.length > 1) {
            return res.status(412).send('Only one plate for description')
        }
    }    
    next();
}

// Update order by number
app.put('/order/:idOrder', [authToken, isOnePlate], async (req, res, next) => {
    await Plates.findOne({
            where: {
                plate: req.body.description
            }
        })
        .then(food =>
            Order.findOne({
                where: {
                    id: req.params.idOrder
                    }
                }).then(order => 
                    Order.update({
                        userId: req.body.userId,
                        description: order._previousDataValues.description+','+req.body.description,
                        amount: food.dataValues.price+order._previousDataValues.amount,
                        status: req.body.status
                        }, {where: {
                            id: req.params.idOrder
                        }}
                    ).then(function(rowsUpdated) {
                            res.json({
                                rowsUpdated: rowsUpdated,
                                message: 'Your order was updated'
                            })         
                        })  
                )          
        ).catch(function (err) {
            // console.log(err);            
            return res.status(404).send('Cannot find plate or idUser');
        })    
})

//Delete a plate of an order (before confirm it)
app.put('/order/deleteplate/:idOrder', [authToken, isOnePlate], async (req, res, next) => {
    await Plates.findOne({
        where: {
            plate: req.body.description
        }
    })
    .then(food => 
            Order.findOne({
                where: {
                    id: req.params.idOrder
                }
            })
            .then(order => 
                    Order.update({
                        description: order._previousDataValues.description.replace(req.body.description, ""),
                        amount: order._previousDataValues.amount-food.dataValues.price,
                    }, {where: {
                            id: req.params.idOrder
                        }}
                    )
                )
                .then(function(rowsUpdated) {
                    res.json({
                        rowsUpdated: rowsUpdated,
                        message: 'A plate was deleted'
                    })
                })
        ).catch(function (err){
            return res.status(404).send('Cannot find plate to delete');
        })
})

// All the orders - admin required
app.get('/order', [authToken, isAdmin], (req, res) => {
    Order.findAll().then(order => res.json(order));
})

// Get all the user orders
app.get('/order/user/:idUser', authToken, (req, res) => {
    Order.findAll({
        where: {
            userId: req.params.idUser
        }
    }).then(order => res.json(order));
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
});