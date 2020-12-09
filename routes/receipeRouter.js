const express = require ('express');
const bodyParser = require ('body-parser');
const receipeRouter = express.Router ();
const mongoose = require('mongoose');
const Receipes = require('../models/receipes');


const url='mongodb://localhost:27017/cuisine';

var connect=null;

receipeRouter.use(bodyParser.json());

var promise = null;


receipeRouter.route('/')
.all ((req, res, next) => {

    connect = mongoose.connect(url);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');

    next();
})
.get((req, res, next)=> {

        connect.then((db) => {

        console.log('Connected Successfully');

        Receipes.find({}).then((receipes)=>{
                console.log('All Receipes' + receipes);
                res.json({receipes});
             }).catch ((err) => {

                    res.statusCode =400;
                    res.send(err);
                    console.log(err);
                }
            );
        }
    )
})
.post((req, res, next) => {
        const receipe_filter = req.body.filter.filterCriteria;

        console.log("=> Post Param : " + JSON.stringify(receipe_filter));

        connect.then((db) => {

            console.log('Connected Successfully');
    
            Receipes.find(receipe_filter).then((receipes)=>{
                    console.log('All Receipes' + receipes);
                    res.json({receipes});
                 }).catch ((err) => {
    
                        res.statusCode =400;
                        res.send(err);
                        console.log(err);
                    }
                );
            }
        )


});



module.exports= receipeRouter;