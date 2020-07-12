const express = require('express');
const bodyParser = require('body-parser');
const {Plates} = require('./sequelize');
const cors = require('cors'); 

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}))


//Gets all the products
app.get('/products', (req, res, next) => {
    Plates.findAll().then(plates => res.json(plates));
})

// Add a new plate
app.post('/products', (req, res, next) => {
    // console.log(req.body);
    Plates.create(req.body)
        .then(plate => res.json(plate)); 
})

// Find plate by id
app.get('/product/:idPlate', (req, res, next) => {
    Plates.findOne({
        where: {
            id: req.params.idPlate
        }
    }).then(plate => res.json(plate));
})

//Update a plate by id
app.put('/product/:idPlate', (req, res, next) => {
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

//Delete a plate by id
app.delete('/product/:idPlate', (req, res, next) => {
    Plates.destroy({
        where: {
            id: req.params.idPlate
        }
    }).then(function(rowsDeleted) {
        res.json({
            rowsDeleted: rowsDeleted
        })
    }).catch(err => {
        return res.status(400).send('Id plate not found')
    })
})


//Run node app
const port = 7000;
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
});