<h1>**Resto app**</h1>
<h2>A nodeJS Restful API with mysql</h2>

This project is a sample of the tools that I am learning at the moment. The idea is to make an API for a restó where:
For common users: You must be able to create an user and login, search for plates to order. 
For admin users: You would be God (in this app at least...)

<h4>**Getting Started**</h4>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

<h4>**Prerequisites**</h4>

You must have installed:
<ol> 
    <li>Mysql - I have the XAMPP version of it</li>
    <li>NodeJS</li>
<ol>

These are the links to download:
    [NodeJS Downloads](https://nodejs.org/es/download/)
    Apache distribution containing MariaDB, PHP, and Perl [XAMPP] (https://www.apachefriends.org/download.html)

<h4>**Installing**</h4>

A step by step series of examples that tell you how to get a development env running

    1- clone the repository this repository
    git clone https://github.com/KMery/simpleCRUDapp.git

    2- Change directory with cd ~/deliah-resto

    3- Install dependencies with npm install
        This will install the following dependencies:
            Express
            sequelize
            mysql2
            body-parser

    4- Run the XAMPP to start mysql and phpmyadmin
    In linux is "sudo /opt/lampp/lampp start"

    5- Then start the server with "node index.js"
    You must see a messege in the console if all run OK

<h4>**Verifying if all is OK**</h4>
Just to check that if is all in order you can execute the following request:

    POST http://localhost:5000/products
    Content-Type: application/json

    {
        "plate": "pizza",
        "price": "200.5"
    }

    GET http://localhost:5000/products


You can check your plate with

    GET http://localhost:5000/product/:idPlate

And you also can delete it 

    DELETE http://localhost:5000/product/:idPlate


<h3>**Author**</h3>
    KMery (Mayra Leiva) - newbie at web developing

<h4>**Acknowledgments**</h4>
<ul>
    <li>Udemy</li>
<ul>