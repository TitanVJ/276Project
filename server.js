const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8080;
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const flash = require('express-flash');
const session = require('express-session');
const uuidv1 = require('uuid/v1');
const { Pool } = require('pg');

const connectionString = ''; // Connection string needs to go here!

const pool = new Pool({
    connectionString: connectionString,
});

app.use(session({
    name:'session',
    genid: function(req) { return uuidv1();},
    secret: 'mysecret',
    maxAge: 1000 * 60 * 60,
    resave: false,
    saveUninitialized: true,
}));

// Add this middleware function to pages you want users to be logged in to view
function loggedIn(req, res, next) {
    if(req.session.user) {
        next();
    } else {
        req.flash('error', 'You must login first!');
        res.render('pages/login', {expressFlash: req.flash('error')})
    }
}

app.use('/', function(req, res, next) {
    next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('pages/login'));
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

app.get('/register', function(req, res) {
    res.render('pages/register');
});

app.post('/sign-up', function(req, res) {
    const values = [req.body.username, bcrypt.hashSync(req.body.password, salt)];

    pool.query('SELECT * FROM users WHERE user_name = $1', [req.body.username], (err, response) =>{
        console.log("ROWS: ", response.rows.length);
        if(response.rows.length > 0) {
            req.flash('error', 'That e-mail is already in use!');
            res.render('pages/register', {expressFlash: req.flash('error')})
        } else {
            pool.query('INSERT INTO users VALUES ($1, $2)', values, (err, response) => {
                if (err) {
                    console.log(err);
                } else {
                    res.render('pages/login')
                }
            });
        }
    });
});

app.post('/login', function(req, res, next) {
    pool.query('SELECT * FROM users WHERE user_name = $1', [req.body.username], (err, response) => {
        if (err) {
            console.log(err);
        } else {
            if(response.rows.length == 0) {
                req.flash('error', 'Incorrect username and/or password!');
                res.render('pages/login', {expressFlash: req.flash('error')})
            } else {
                if(bcrypt.compareSync(req.body.password, response.rows[0].password)) {
                    req.session.user = response.rows[0];
                    console.log("Logged in!");
                    res.redirect('/dashboard');

                } else {
                    req.flash('error', "Incorrect username and/or password!");
                    res.render('pages/login', {expressFlash: req.flash('error')});
                }
            }
        }
    });
});