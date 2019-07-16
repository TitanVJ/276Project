const express = require('express');
const request = require('request');
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
const server =  app.listen(PORT, ()=>{console.log("Magic is happening on port " + PORT);});
const io = require("socket.io")(server);
var cors = require('cors');
const fs = require('fs');

const connectionString = 'postgresql://postgres:postgres@localhost:5432/cmpt276';
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
app.use(flash());

app.get('/register', function(req, res) {
    res.render('pages/register');
});

/* Create new user and insert them into the DB */
app.post('/sign-up', function(req, res) {
    const values = [req.body.username, bcrypt.hashSync(req.body.password, salt)];

    pool.query('SELECT * FROM users WHERE user_name = $1', [req.body.username], (err, response) =>{

        if(response.rows.length > 0) {
            req.flash('error', 'That username is already in use!');
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

/* Validate user's credentials and log them into the site */
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
                        res.redirect('./admin')
                    } else {
                        res.redirect('/game.html');
                    }
                } else {
                    req.flash('error', "Incorrect username and/or password!");
                    res.render('pages/login', {expressFlash: req.flash('error')});
                }
            }
        }
    });
});

/* TESTING: To check if a row has been added to the users table */
app.get('/get-num-users', function(req, res) {
   pool.query("SELECT * FROM users", (err, response) => {
      if(err) {
          console.log(err);
      } else {
          res.send({rowTotals:response.rows.length});
      }
   });
});

/* Destroy a users session when they logout*/
app.get('/logout', function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/');
    });
});

/* Serve the admin page */
app.get('/admin', loggedIn, function(req, res) {
  if(hasPermissions(req.session.user) == true){
    res.render('pages/admin', {user: req.session.user});
  }
  else{
    res.redirect('pages/logout');
  }
});

/* Serve the professor list portion of the admin page */
app.get('/admin_professor', loggedIn, function(req, res) {
    if(hasPermissions(req.session.user) == true){
        res.render('pages/admin_professor');
    }
    else{
        res.redirect('pages/logout');
    }
});


/*  */
app.get('/search', (req, res)=>{
    const query = {
        text: 'SELECT user_name,status,last_updated,record_created FROM users WHERE ' + req.query.column + '=$1',
        values: [req.query.value]
    };
    pool.query(query, (err, result)=>{
        if(err){
            console.log(err.message);
            res.end();
        }
        else if(result.rowCount == 0){
            // console.log(result)
            console.log('Empty table');
            res.end();
        }

        const results = { 'results': (result) ? result.rows : null };
        res.send(results);
    });

});

app.get('/searchProfDex', (req, res)=>{
    const query = {
        text: 'SELECT prof_fname,prof_lname,photo_id, last_updated, record_created FROM profDex WHERE ' + req.query.column + '=$1',
        values: [req.query.value]
    };

    pool.query(query, (err, result)=>{
        if(err){
            console.log(err.message);
            res.end();
        }
        else if(result.rowCount == 0){
            // console.log(result)
            console.log('Empty table');
            res.end();
        }

        const results = { 'results': (result) ? result.rows : null };
        res.send(results);
    });

});
/***************************************/
app.get('/toTable', (req, res) => {
    // let sql = format('SELECT * FROM %I', req.query.user+'ProfList');
    // console.log(sql).
    const query = 'SELECT prof_id,prof_fname,prof_lname,photo_id,catch_time FROM ' + req.query.user + 'ProfList';
    console.log(query);
    pool.query(query ,(error, result)=>{
        if(error){
            console.log(error.message);
            res.end();
        }
        if(result.rowCount == 0){
            console.log('Empty table');
            res.end();
        }
        const results = { 'results': (result) ? result.rows : null };
        res.send(results);
    });

});
/**************************************/
app.get('/data', (req, res)=>{
    pool.query("select user_name,status,last_updated,record_created FROM users", (error, result)=>{
        if(error){
            console.log(error.message);
            res.end();
        }
        if(result.rowCount == 0){
            console.log('Empty table');
            res.end();
        }
    const results = { 'results': (result) ? result.rows : null };
    res.send(results);
    });
});
app.get('/dataProfDex', (req, res)=>{
    pool.query("SELECT prof_id,prof_fname,prof_lname,photo_id,last_updated,record_created FROM profDex", (error, result)=>{
        if(error){
            console.log(error.message);
            res.end();
        }

        if(result.rows.length == 0){
            console.log('Empty table');
            res.end();
            return;
        }

    const results = { 'results': (result) ? result.rows : null };
    res.send(results);
    });
});
/**********************************/
app.delete('/removeUser/:id', (req, res)=>{

    console.log('del start');
    pool.query('DELETE FROM users WHERE user_name=$1', [req.params.id], function (err, resp) {
      if (err){
        console.log('del failed');
        res.end();
      }
      else {
        res.end();
      }
    })

});
app.delete('/removeProf/:id', (req, res)=>{

    console.log('del start');
    pool.query('DELETE FROM profDex WHERE prof_id=$1', [req.params.id], function (err, resp) {
      if (err){
        console.log('del failed');
          res.end();
      }
      else {
        res.end();
      }
    })
});

// Socket code
io.on('connection', (socket)=>{
    console.log("User connection established");

    socket.on('disconnect', ()=>{
        console.log('user disconnected');
    });

    // used to determine if a character will 
    socket.on('move', (data)=>{
        // determine

        if(!data){
            var c = Math.floor((Math.random() * 100) + 1);
            console.log(c);
            if(c%4 == 0 && c%3 == 0){
                //encouter
                // send back and obj, contain img id, prof
                // for testing do console.log
                
                // TODO: change this to be function call that'll return the prof that they will encounter with all the stats
                // for now send a temp obj
                var tempProf = {
                    name: 'mr.crocker', 
                    rarity: 'normal',
                    level: '25'
                };
                socket.emit('encounter', tempProf);
            }
        }
        else{
            socket.emit('no');
        }
    })
});
// Socket Code ends here


// app.get('/get-course-years', function(req, res) {
//     request('http://www.sfu.ca/bin/wcm/course-outlines', { json: true }, (err, resp, body) => {
//         if (err) { return console.log(err); }
//         res.send(body);
//     });
// });
//
// app.get('/get-course-term:year', function(req, res) {
//     console.log(req.params.year)
//     request('http://www.sfu.ca/bin/wcm/course-outlines?' + req.params.year, { json: true }, (err, resp, body) => {
//         if (err) { return console.log(err); }
//         res.send(body);
//     });
// });
//
// app.get('/get-course-dept/:year', function(req, res) {
//     console.log(req.params.term)
//     request('http://www.sfu.ca/bin/wcm/course-outlines?' + req.params.year, { json: true }, (err, resp, body) => {
//         if (err) { return console.log(err); }
//         res.send(body);
//     });
// });




app.get('/check-file/:fileName', function(req, res) {
    console.log(req.params.fileName);
    if (fs.existsSync('./public/images/prof_images/' + req.params.fileName)) {
        res.send(true);
    } else {
        res.send(false);
    }



});







module.exports = app;
