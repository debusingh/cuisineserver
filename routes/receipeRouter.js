const express = require ('express');
const bodyParser = require ('body-parser');
const receipeRouter = express.Router ();
const mongoose = require('mongoose');
const Receipes = require('../models/receipes');


//const url='mongodb://localhost:27017/cuisine';
const url='mongodb+srv://thecuisine:04Chaar04@cluster0.7j1pd.mongodb.net/cuisine'

var connect=null;

receipeRouter.use(bodyParser.json());

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
        var mysort = { _id: -1 };

        connect.then((db) => {

            console.log('Connected Successfully');
    
            Receipes.find(receipe_filter).sort(mysort).then((receipes)=>{
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

receipeRouter.route('/distinct')
.all ((req, res, next) => {

    connect = mongoose.connect(url);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');

    next();
})
.post((req, res, next) => {
    const column_name = req.body.filter.column;
    //const column_name = 'Region';
    console.log("=> Post Param : " + JSON.stringify(column_name));

    connect.then((db) => {

        console.log('Connected Successfully');

        Receipes.distinct(column_name).then((column_vals)=>{
                console.log('All Col Values' + column_vals);
                res.json({column_vals});
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