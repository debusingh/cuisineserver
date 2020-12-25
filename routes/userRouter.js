const express = require('express');
const bodyParser = require('body-parser');
const userRouter = express.Router();
const mongoose = require('mongoose');
const RegUsers = require('../models/users');


//const url = 'mongodb://localhost:27017/cuisine';
const url='mongodb+srv://thecuisine:04Chaar04@cluster0.7j1pd.mongodb.net/cuisine'

var connect = null;

userRouter.use(bodyParser.json());

userRouter.route('/user')
  .all((req, res, next) => {

    connect = mongoose.connect(url);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');

    next();
  }).post((req, res, next) => {
    const user_filter = req.body.user;
    try {
      connect.then((db) => {

        RegUsers.find(user_filter).then((user) => {
          res.json({ user });
        }).catch((err) => {

          res.statusCode = 400;
          res.send(err);
          console.log(err);
        }
        );
      }
      )
    } catch (err) {

      res.statusCode = 400;
      res.send(err);
      console.log(err);
    };
  }).put((req, res, next) => {

    try {
      connect.then((db) => {

        var myData = new RegUsers(req.body.user);
        console.log('Body : ', req.body);

        myData.save().then((item) => {
          res.send(item)
        }).catch((err) => {

          res.statusCode = 400;
          res.send(err);
          console.log(err);
        });
      })
    } catch (err) {

      res.statusCode = 400;
      res.send(err);
      console.log(err);
    }
  });

module.exports = userRouter;