//using the express app
const express= require('express');
const app= express();

const port= 8000;
const db = require("./config/mongoose");
const bodyParser = require("body-parser");

//to convert scss files to css file
const sassMiddleware= require('node-sass-middleware');

const expressLayouts= require('express-ejs-layouts'); //to use layouts in ejs file
const session= require('express-session');

//to display flash messages to user(NOTY is needed to be included at each .ejs page)
const flash= require('connect-flash');
const customMware= require('./config/middleware'); //middleware for flash messages
app.use(bodyParser.json());

//telling the express app to use sass middleware before the server runs, so that we can convert scss file to css file
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

//this is compulsary to inlcude
app.use(express.urlencoded());

//telling the express app that for static files look into assets folder
app.use(express.static('./assets'));

//telling to use express layouts and extract the stylesheets and script files and place them as specified in layout.ejs
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//setup view engine, for all ejs files use views folder
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'codeial',
    //change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    /*cookie: {
        maxAge: (1000*60*100) //after this time, cookie expires (milliseconds)
    },*/
}));

app.use(flash());
app.use(customMware.setFlash);

//use express router
app.use('/', require('./routes')); //must place this line after passport lines

app.listen(port, function(err) {
    if(err) {
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
})