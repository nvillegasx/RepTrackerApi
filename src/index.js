// https://auth0.com/blog/react-tutorial-building-and-securing-your-first-app/
// to run server: node src

//import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const db = require('./config/db');
const Schema = mongoose.Schema;
const UserSchema = require('./models/userModel');

// let UserSchema = new Schema({
//     name: {
//         firstname: String,
//         lastname: String
//     },
//     email: String,
//     password: String,
//     workouts: [
//         {
//             date: {
//                 type: Date,
//                 timeStart: Date.now(),
//                 timeEnd: Date.now(),
//                 workout: [
//                     {
//                         exercisename: String,
//                         repetitions: Number,
//                         weight: Number
//                     }
//                 ]
//             }
//         }
//     ]
// });

// define the Express app
const app = express();

// connect to mlab
mongoose.connect(db.url,{ useNewUrlParser: true }, (err, db) => {
    if(err){
        return console.log(err);
    }
})

// mlab connection
const dbconn = mongoose.connection;

dbconn.on('error', console.error.bind(console, 'connection error: '));

dbconn.once('open', () => {
    console.log('connected to database');
})

// enhance your app security with Helmet
app.use(helmet());

// use bodyParser to parse application/json content-type
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// enable all CORS requests
app.use(cors());

// api home info
app.get('/', (req, res) => {
  res.send('health api');
});

// add user to database
app.post('/login', (req, res) => {
    // first name, last name, email, password
    console.log(req.body)
    let newUser = new UserSchema({
        email: req.body.email, 
        password: req.body.password

    });
    UserSchema.findOne({ email: req.body.email},
    function(err, obj)
    {
        if(err)
            return handleError(err);
        // and email
        if( obj.password == req.body.password)
            res.send({
                code : '200',
                status : 'OK',
                userData: obj
            })
        else{
            res.send({
                code : '401',
                status : 'INVALID PASSWORD'
            })
        }
        // else
        //     console.log(obj)
    })
    // res.send("user found");

});

// add user to database
app.post('/signup', (req, res) => {
    // first name, last name, email, password
    console.log(req.body)
    let newUser = new UserSchema({
        name: {
            firstname : req.body.firstname,
            lastname: req.body.lastname
        },
        email: req.body.email, 
        password: req.body.password

    });
    // console.log(newUser);
    newUser.save(function(err){
        if(err)
            return handleError(err);
    })
    res.send("new user added");

});

// get the users workouts
app.get('/workouts', (req, res) => {
    // req.body will contain which one they want

});
// ******** works *********
// add an exercise
app.post('/exercise', (req, res) => {
    // req.body will contain workout they want to add
    console.log(req.body);

    //save exercise to database


    res.send("adding workout");

});

// start the server
app.listen(8081, () => {
  console.log('listening on port 8081');
});