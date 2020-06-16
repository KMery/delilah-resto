<h1>**Delilah Restó**</h1>
<h2>A nodeJS Restful API with mysql</h2>

This project is a sample of the tools that I am learning at the moment. The idea is to make an API for a restó where:
For common users: You must be able to create an user and login, search for plates to order. 
For admin users: You would be God (in this app at least...)

<h3>**Getting Started**</h3>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

<h4>**Prerequisites**<h4>

You must have installed:
<ol>
    <li>Mysql - I have the XAMPP version of it</li>
    <li>NodeJS</li>
</ol>
You will need this dependencies:
    <ul>
        <li>Express</li>
        <li>JWT</li>
        <li>sequelize</li>
        <li>mysql2</li>
        <li>dotenv</li>
        <li>body-parser</li>
    </ul>
These are the links to download:
    [NodeJS Downloads](https://nodejs.org/es/download/)
    Apache distribution containing MariaDB, PHP, and Perl [XAMPP] (https://www.apachefriends.org/download.html)

<h4>**Installing**</h4>

A step by step series of examples that tell you how to get a development env running

    1- clone the repository in a terminal with 
    git clone https://github.com/KMery/deliah-resto.git

    2- Change directory with cd ~/deliah-resto

    3- Install dependencies with npm install

    4- Run the XAMPP to start mysql and phpmyadmin
    In linux is "sudo /opt/lampp/lampp start"

    5- Then start the server with "node index.js"
    You must see a messege in the console if all run OK

**Verifying if all is OK**
Just to check that if is all in order you can execute the following request to create an user:

    POST http://localhost:5000/users
    Content-Type: application/json

    {
        "nameUser": "user",
        "adress": "Neverland",
        "telephone": 333111444,
        "mail": "mail1@mail.com",
        "password": "test"
    }

then try to login with

    POST http://localhost:5000/login
    Content-Type: application/json

    {
        "name": "user",
        "password": "test"
    }

this would give you a token to use to create an order or to see the plates:

    GET http://localhost:5000/plates
    authorization: Bearer your_token_here

Now that you know what plates are availabl you can start an order

    POST http://localhost:5000/order/new
    authorization: Bearer your_token_here

And then give the request the plates you want

    PUT http://localhost:5000/order/1
    authorization: Bearer your_token_here
    Content-Type: application/json

    {   
        "userId": 1,
        "description": "salad"
    }

You can check your order with

    GET http://localhost:5000/order/user/1
    authorization: Bearer your_token_here


<h4>**Author**</h4>
    KMery (Mayra Leiva) - newbie at web developing

**Acknowledgments**

    Acamica
    StackOverFlow communitty
