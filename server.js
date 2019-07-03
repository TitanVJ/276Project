const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8080;
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const flash = require('express-flash');
const session = require('express-session');
const uuidv1 = require('uuid/v1');
var format = require('pg-format');
const { Pool } = require('pg');
var cors = require('cors')

//const connectionString = process.env.DATABASE_URL;
const connectionString = 'postgresql://postgres:postgres@localhost/cmpt276';
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

// Use this function to test if user is an admin -- Pass in req.session.user
function hasPermissions(user) {
    if(user.status == 'admin') {
        return true;
    } else {
        return false;
    }
};

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
app.use(express.json());
app.use('/', cors());
app.use(express.urlencoded({extended: false}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('pages/login'));
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
app.use(flash());

app.get('/register', function(req, res) {
    res.render('pages/register');
});

app.post('/sign-up', function(req, res) {
    const values = [req.body.username, bcrypt.hashSync(req.body.password, salt)];

    pool.query('SELECT * FROM users WHERE user_name = $1', [req.body.username], (err, response) =>{

        if(response.rows.length > 0) {
            req.flash('error', 'That e-mail is already in use!');
            res.render('pages/register', {expressFlash: req.flash('error')})
        } else {
            pool.query('INSERT INTO users VALUES ($1, $2)', values, (err, response) => {
                if (err) {
                    console.log(err);
                } else {
                    let sql = format('CREATE TABLE %I (prof_fname VARCHAR(32), prof_lname VARCHAR(32), photo_id NUMERIC, catch_time TIMESTAMP DEFAULT now() )', `${req.body.username}ProfList`);
                    pool.query(sql, (err, response) => {
                       if(err) {
                           console.log(err);
                       } else {
                           res.render('pages/login')
                       }
                    });
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

                    if(hasPermissions(req.session.user)) {
                        res.redirect('/admin_page')
                    } else {
                        res.render('pages/dashboard');
                    }
                } else {
                    req.flash('error', "Incorrect username and/or password!");
                    res.render('pages/login', {expressFlash: req.flash('error')});
                }
            }
        }
    });
});

app.get('/get-num-users', function(req, res) {
   pool.query("SELECT * FROM users", (err, response) => {
      if(err) {
          console.log(err);
      } else {
          res.send({rowTotals:response.rows.length});
      }
   });
});

app.get('/logout', function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/');
    });
});

module.exports = app;