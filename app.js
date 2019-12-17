const express = require('express');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const {getHomePage, getStage1, getStage2, getStage3, getStage4, getStage5, getStage6, getRejected} = require('./routes/index');
const {addCandidatePage, addCandidate, deleteCandidate, editCandidate, editCandidatePage} = require('./routes/candidate');
const {getLoginPage, login} = require('./routes/login');
const port = 5000;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'Aa123456',
    database: 'wecode'
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// routes for the app
app.get('/', getHomePage);
app.get('/stage1', getStage1);
app.get('/stage2', getStage2);
app.get('/stage3', getStage3);
app.get('/stage4', getStage4);
app.get('/stage5', getStage5);
app.get('/rejectedwithpotential', getStage6);
app.get('/rejected', getRejected);
app.get('/add', addCandidatePage);
app.get('/edit/:id/:stage', editCandidatePage);
app.get('/delete/:id/:stage', deleteCandidate);
app.get('/login', getLoginPage);
app.post('/login', login);
app.post('/add', addCandidate);
app.post('/edit/:id/:stage', editCandidate);

// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});