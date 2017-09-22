const express = require('express');
var logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressSanitizer = require("express-sanitizer");
const methodOverride = require('method-override');
const ejs = require('ejs');
const engine = require('ejs-mate');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

// Config
const port = 3000;
const DB_URI = 'mongodb://localhost:27017/myapp';

// Init App
const app = express();

// DB Connect
mongoose.Promise = global.Promise;
mongoose.connect(DB_URI, { useMongoClient: true });

// Connection Events
mongoose.connection.once('connected', function(){
    console.log('Database Connected to : ' + DB_URI);
});
mongoose.connection.on('error', function(){
    console.log('MongoDB connection error' + err);
});
mongoose.connection.once('disconnected', function(){
    console.log('Database Disconnected');
});

// If Node's process ends, close the MongoDB connection
process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Database disconnected through app termination');
        process.exit(0);
    });
});

// Static Folder
app.use(express.static('public'));

// Middleware
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(expressSanitizer());
app.use(session({
    secret: 'sqlplus8041999',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

// Routes
require('./routes/user')(app);
require('./routes/ville')(app);

// Start Server
app.listen(port, function(){
    console.log(`Server started on port ${port}...`);
});