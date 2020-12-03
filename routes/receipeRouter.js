const express = require ('express');
const bodyParser = require ('body-parser');
const receipeRouter = express.Router ();
const mongoose = require('mongoose');
const Receipes = require('../models/receipes');

const url='mongodb://localhost:27017/cuisine';

var connect=null;

receipeRouter.use(bodyParser.json());


receipeRouter.route('/')
.all ((req, res, next) => {

    connect = mongoose.connect(url);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}).get((req, res, next)=> {

        connect.then((db) => {

        console.log('Connected Successfully');

        Receipes.find({}).then((receipes)=>{
                console.log('All Receipes' + receipes);
                res.json({receipes});
             });
    }).then (()=>{

        console.log('Closing Connection');
       // mongoose.connection.close();
    }).catch ((err) => {

        res.statusCode =400;
        res.send(err);
        console.log(err);
    });
});

module.exports= receipeRouter;