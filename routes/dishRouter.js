const express = require ('express');
const bodyParser = require ('body-parser');

const dishRouter = express.Router ();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all ((req, res, next) => {

    res.statusCode = 200;
    res.setHeader('COntent-Type', 'text/plain');
    next();
}).get((req, res, next)=> {

    res.end('All Dishes');
});

module.exports= dishRouter;