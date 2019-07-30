<<<<<<< HEAD
const express = require('express');
const request = require('request');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8080;
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const flash = require('express-flash');
const uuidv1 = require('uuid/v1');
var format = require('pg-format');
const { Pool } = require('pg');
var cors = require('cors');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const server =  app.listen(PORT, ()=>{console.log("Magic is happening on port " + PORT);});
const io = require("socket.io")(server);

app.use(fileUpload());

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
    connectionString: connectionString,
});


//AMY
// var pg = require('pg');
// var AMYconnectionString = "postgres://password@localhost:5432/postgres";
// var pgClient = new pg.Client(AMYconnectionString);
// pgClient.connect();

app.get('/profPrev', function (req, res){
        pool.query("SELECT * from profDex", function(error, result){
            // if(error){
            //     console.log('hi');
            // }if (results == 0){
            //     console.log('ah');
            // }
            var results = { 'results': (result.rows[0]) ? result.rows : [] };

            // console.log(result);
            res.render('pages/prof', results);
            // console.log(result + 'hi');
        });
})
app.get('/yourProfPrev', function (req, res){
    pool.query("SELECT * from camronProfList", function(error, result){
        var results = { 'results': (result.rows[0]) ? result.rows : [] };
        res.render('pages/yourProf', results);
    });
})
//END OF AMY

const session = require('express-session')({
    name:'session',
    genid: function(req) { return uuidv1();},
    secret: 'mysecret',
    maxAge: 1000 * 60 * 60,
    resave: true,
    saveUninitialized: true,
})
app.use(session);

// Use this function to test if user is an admin -- Pass in req.session.user
function hasPermissions(user) {
    if(user.status == 'admin') {
        return true;
    } else {
        return false;
    }
}

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
    const values = [req.body.username, bcrypt.hashSync(req.body.password, salt), 'user'];

    pool.query('SELECT * FROM users WHERE user_name = $1', [req.body.username], (err, response) =>{

        if(response.rows.length > 0) {
            req.flash('error', 'That username is already in use!');
            res.render('pages/register', {expressFlash: req.flash('error')})
        } else {
            pool.query('INSERT INTO users (user_name, password, status) VALUES ($1, $2, $3)', values, (err, response) => {
                if (err) {
                    console.log(err);
                } else {
                    const sql = {
                        text: 'CREATE TABLE '+ [req.body.username]+'ProfList(prof_fname VARCHAR(32), prof_lname VARCHAR(32), photo_id NUMERIC, catch_time TIMESTAMP DEFAULT now() )'
                    }
                    console.log(sql);
                    pool.query(sql, (err, response) => {
                       if(err) {
                           console.log(err);
                       } else {
                            console.log("proflist made");
                       }
                    });
                    const sql1 = {
                        text: 'CREATE TABLE '+ [req.body.username]+'Inventory(item_name VARCHAR(32), iphoto_id NUMERIC, quantity NUMERIC, item_added TIMESTAMP DEFAULT now())'
                    }
                    console.log(sql1);
                    pool.query(sql1, (err, response) => {
                       if(err) {
                           console.log(err);
                       } else {
                       console.log("Inventory Made");
                       var office="Prof Office Hours";
                       const query = {
                           text: 'INSERT INTO '+ req.body.username+'Inventory (item_name, iphoto_id, quantity) VALUES ($1,1,0)',
                           values: [office]
                       }
                       console.log(query);
                       pool.query(query,(err, response) => {
                             if(err) {
                                 console.log(err);
                             }
                        });
                       }
                    });

                    req.flash('info', "New User Created Successfully. Please Sign-in.");

                    res.render('pages/login', {expressFlashNewUser: req.flash('info')})
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
                        res.redirect('./admin');
                    } else {
                      req.session.encounter_chance = 12;
                      req.session.use_time= 0;
                      req.session.user_name = req.body.username;
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
    res.redirect('pages/login');
  }
});

/* Serve the professor list portion of the admin page */
app.get('/admin_professor', loggedIn, function(req, res) {
    if(hasPermissions(req.session.user) == true){
        res.render('pages/admin_professor');
    }
    else{
        res.redirect('pages/login');
    }
});
/*For navigation to profdex*/
app.get('/user_profDex', loggedIn, function(req,res){
  if(req.session.user){
      res.redirect('/prof.html');
  }
  else{
      res.redirect('pages/login');
  }
});

app.get('/toInventoryGame', async(req, res) => {
    // let sql = format('SELECT * FROM %I', req.query.user+'ProfList');
    // console.log(sql).
    const query = 'SELECT item_name, iphoto_id, quantity, item_added FROM ' + [req.session.user_name]+ 'Inventory';
    console.log(query);
    pool.query(query ,(error, result)=>{
        if(error){
            console.log(error.message);
            res.send('');
        }
        if(result.rowCount == 0){
            console.log('Empty table');
            res.send('');
        }
        const results = { 'results': (result) ? result.rows : null };
        res.status(200);
        res.send(results);
    });

});
app.get('/toInventory', (req, res) => {
    const query = 'SELECT item_name, iphoto_id, quantity, item_added FROM ' + req.query.user + 'Inventory';
    pool.query(query ,(error, result)=>{
        if(error){
            console.log(error.message);
            res.send('');
        }
        const results = { 'results': (result) ? result.rows : null };
        res.status(200);
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

/* Get all the professor data from the DB */
app.get('/dataProfDex', (req, res) =>{
    pool.query("SELECT * FROM profDex", (error, result)=>{
        if(error){
            console.log(error.message);
            res.end();
        }

    const results = { 'results': (result) ? result.rows : null };
    res.send(results);
    });
});

/* Delete a user from the DB */
app.delete('/removeUser/:id', (req, res)=>{

    pool.query('DELETE FROM users WHERE user_name=$1', [req.params.id], function (err, resp) {
      if (err){
        console.log('del failed');
      }
      else {
      }
    })
    const sql = {
        text: 'DROP TABLE '+[req.params.id]+'Inventory'
    }
    pool.query(sql, function (err, resp) {
      if (err){
        console.log('del failed');
      }
      else {
      }
    })
    const sql1 = {
        text: 'DROP TABLE '+[req.params.id]+'ProfList'
    }
    pool.query(sql1, function (err, resp) {
      if (err){
        console.log('del failed');
      }
      else {
      }
    })

    res.send('');

})
app.delete('/removeProf/:id', (req, res)=>{

    pool.query('DELETE FROM profDex WHERE prof_id=$1', [req.params.id], function (err, resp) {
      if (err){
        console.log('del failed');
          res.end();
      }
      else {
        res.end();
      }
    })
})
/**********************************************************/
app.get('/addCandy', function(req,res){
  var test = req.session.user_name;
  console.log(test);
  var itemChance = Math.floor((Math.random() * 100) + 1);
  if(itemChance<=100)
  {
    const sql1 = {
      text: 'UPDATE '+ [req.session.user_name]+'Inventory SET quantity=quantity+1 WHERE quantity>=0'
    }
    pool.query(sql1, (err, response) => {
       if(err) {
           console.log(err);
       } else {
            console.log("items increased");
            res.status(200);
       }

    });
  }
  res.end();
})
app.get('/popAPill',async(req,res)=>{
  console.log(req.session.user_name);
  if(req.session.encounter_chance-Date.now() > 60000){
    alert("Recently Used a Candy");
  }
  else{
    const sql = {
        text: 'SELECT quantity FROM '+[req.session.user_name]+'Inventory'
    }
    pool.query(sql, (err, response) => {
       if(err) {
           console.log(err);
       }
       console.log(response.rows[0].quantity);
       if(req.session.itemUsed != 'true'){

         const sql1 = {
             text: 'UPDATE '+ [req.session.user_name]+'Inventory SET quantity=quantity-1 WHERE quantity>0'
         }
         pool.query(sql1, (err, response) => {
            if(err) {
                console.log(err);
            } else {
                 console.log("Popping pills");
                 req.session.encounter_chance = 4;
                 req.session.itemTime= Date.now();
                 res.status(200);
                }
            });
        }
        else{
            alert("You do not have any Prof Hours left to Visit");
        }

    });
  }
  res.end();
})

app.post('/caught',(req,res)=>{
        //encouter
        // send back and obj, contain img id, prof
        // for testing do console.log

        // TODO: change this to be function call that'll return the prof that they will encounter with all the stats
        // for now send a temp objS
      const sql = {
          text: 'INSERT INTO '+[req.session.user_name]+'ProfList(prof_fname, prof_lname, photo_id) VALUES ($1,$2,$3)',
          values:  [[req.body.data.prof_fname], [req.body.data.prof_lname], req.body.data.photo_id]
      }
      pool.query(sql, (err, response) => {
         if(err) {
             console.log(err);
         } else {
              console.log("prof caught added");
              status(200);
         }
      });


})
app.get('/getUserName', loggedIn,(req, res) => {
    const results = {user_name: req.session.user_name, use_time: req.session.use_time, encounter_chance: req.session.encounter_chance};
    if(Date.now()-results.use_time > 60000){
      req.session.encounter_chance = 12;
      results.encounter_chance = 12;
    }
    res.send(results);
});
// Socket code
  io.on('connection', (socket)=>{
      console.log("User connection established");

      socket.on('disconnect', ()=>{
          console.log('user disconnected');
      })
        // used to determine if a character will
        socket.on('move', function(data){
            // determine
            var c = Math.floor((Math.random() * 100) + 1);
            console.log(c);
            console.log(data);
            if(c%data == 0){
                //encouter
                // send back and obj, contain img id, prof
                // for testing do console.log

                // TODO: change this to be function call that'll return the prof that they will encounter with all the stats
                // for now send a temp obj
                var tempProf = {
                    prof_fname: 'bobby',
                    prof_lname: 'chan',
                    photo_id: '1',
                    questions: ['How old am I?', 'What food do I use most in my examples?'],
                    answers: [['25', '35', 0],['Cakes', 'Cupcakes', 1]]
                }
                socket.emit('encounter', tempProf);
            }

        });
  })

// Socket Code ends here

/* Used to check if a profs photo exists */
app.get('/check-file/:fileName', function(req, res) {
    console.log(req.params.fileName);
    if (fs.existsSync('./public/images/prof_images/' + req.params.fileName)) {
        res.send(true);
    } else {
        res.send(false);
    }
});

/* Add a professor who's photo is already on the server to the DB (ie. only add their information to the DB) */
app.post('/addProfDex/:profName', function(req, res) {
    console.log(req.query);
    let photoID = `${req.query.fname.toUpperCase()}_${req.query.lname.toUpperCase()}`;

    pool.query('SELECT * FROM profdex WHERE photo_id = $1', [photoID], (err, response) =>{
       if(err) {
           console.log(err);
       } else {
           if(response.rows.length > 0) {
               res.send("exists")
           } else {
               let values = [req.query.fname, req.query.lname, photoID];
               pool.query('INSERT INTO profDex (prof_fname, prof_lname, photo_id) VALUES ($1, $2, $3)', values, (err, response) => {
                   if (err) {
                       console.log(err);
                   } else {
                       res.send('success');
                   }
               });
           }
       }
    });
});

/* Upload new professor photo and add professor information to the DB */
app.post('/add-new-prof', loggedIn, function(req, res) {
 let fileName = `${req.body.common.toUpperCase()}_${req.body.lname.toUpperCase()}.jpg`;
    if(req.files.filename){
        var file = req.files.filename,
            type = file.mimetype;
        var uploadpath = __dirname + '/public/images/prof_images/' + fileName;
        file.mv(uploadpath,function(err){
            if(err){
                console.log("File Upload Failed",fileName,err);
                res.end();
            }
            else {
                console.log("File Uploaded",fileName);

                let photoID = `${req.body.fname.toUpperCase()}_${req.body.lname.toUpperCase()}`;

                pool.query('SELECT * FROM profdex WHERE photo_id = $1', [photoID], (err, response) =>{
                    if(err) {
                        console.log(err);
                    } else {

                        if(response.rows.length > 0) {
                            res.send("exists")
                        } else {
                            let values = [uuidv1(), req.query.fname, req.query.lname, photoID];
                            pool.query('INSERT INTO profdex VALUES ($1, $2, $3, $4)', values, (err, response) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    res.redirect('/admin_professor');
                                }
                            });
                        }
                    }
                });
            }
        });
    }
});

/* Changes a user's status from 'user' to 'admin' -- Doesn't delete their game tables though */
app.get('/changeUserStatus', function(req, res) {
    var sql = format("UPDATE %s SET status = %s WHERE user_name = %s", 'users', 'admin', `${req.query.user}`);
    pool.query("UPDATE users SET status = 'admin' WHERE user_name = $1",[req.query.user], (err, response) =>{
        if(err) {
            console.log(err);
        } else {
            res.end();
        }
    });
});

<<<<<<< HEAD

app.post('/updateLocation',async(req,res)=>{
	if (req.session.user_name){
		var sql = "SELECT * FROM userPos WHERE user_name='"+req.session.user_name+"'";
		pool.query(sql, (err, response) => {
			if(err) {
				console.log(err);
			}
			if (response){
				if(response.rows.length > 0) {
					let values = [parseInt(req.query.x),parseInt(req.query.y),String(req.session.user_name)];
					pool.query("UPDATE userPos SET x_pos=$1,y_pos=$2 WHERE user_name=$3", values, (err, response) => {
						if(err) {
							console.log(err);
						}
						else{
							//console.log("updated "+values[2]+"'s position to x="+values[0]+" and y="+values[1]);
						}
					});
				} else {
					let values = [String(req.session.user_name),parseInt(req.query.x),parseInt(req.query.y)];
					pool.query("INSERT INTO userPos(user_name,x_pos,y_pos) VALUES ($1,$2,$3)", values, (err, response) => {
						if(err) {
							console.log(err);
						}
						else{
							//console.log("updated "+values[0]+"'s position to x="+values[1]+" and y="+values[2]);
						}
					});
				}
			}
			else {
				console.log("no response from query");
			}
			res.status(200);
		});
		res.end();
	}
	else {
		console.log("re-log required")
	}
})

app.get('/getLocation',async(req,res)=>{
	if (req.session.user_name){
		var sql = "SELECT * FROM userPos WHERE user_name='"+req.session.user_name+"'";
		pool.query(sql, (err, response) => {
			if(err) {
				console.log(err);
			}
			if(response){
<<<<<<< HEAD
				if(response.rows.length > 0) {
					res.status(200);
					res.send({"x":response.rows[0].x_pos,"y":response.rows[0].y_pos});
				}
				else {
					pool.query("INSERT INTO userPos(user_name) VALUES ($1)", [req.session.user_name], (err, response) => {
						if(err) {
							console.log(err);
						}
						else{
							console.log("created user "+req.session.user_name);
							var sql = "SELECT * FROM userPos WHERE user_name='"+req.session.user_name+"'";
							pool.query(sql, (err, response) => {
								if(err) {
									console.log(err);
								}
								if(response){
									res.status(200);
									res.send({"x":response.rows[0].x_pos,"y":response.rows[0].y_pos});
								}
							});
						}
					});
				}
=======
				res.status(200)
        data = {x: response.rows.X_pos, y: response.rows.Y_pos}
        res.send(data);
>>>>>>> Fixed Inventory pop up, and office hour uses properly run out.
			}
		})
	}
})
// Change prof_id to uuid
// Change photo_id to varchar

<<<<<<< HEAD
=======
>>>>>>> Added some comments and cleaned up console.log statements a bit
=======
>>>>>>> fixing code
module.exports = app;
=======
const express = require('express');
const request = require('request');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8080;
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const flash = require('express-flash');
const uuidv1 = require('uuid/v1');
var format = require('pg-format');
const { Pool } = require('pg');
var cors = require('cors');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const server =  app.listen(PORT, ()=>{console.log("Magic is happening on port " + PORT);});
const io = require("socket.io")(server);

app.use(fileUpload());

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
    connectionString: connectionString,
});


//AMY
// var pg = require('pg');
// var AMYconnectionString = "postgres://password@localhost:5432/postgres";
// var pgClient = new pg.Client(AMYconnectionString);
// pgClient.connect();

app.get('/profPrev', function (req, res){
        pool.query("SELECT * from profDex", function(error, result){
            // if(error){
            //     console.log('hi');
            // }if (results == 0){
            //     console.log('ah');
            // }
            var results = { 'results': (result.rows[0]) ? result.rows : [] };

            // console.log(result);
            res.render('pages/prof', results);
            // console.log(result + 'hi');
        });
})
app.get('/yourProfPrev', function (req, res){
    pool.query("SELECT * from camronProfList", function(error, result){
        var results = { 'results': (result.rows[0]) ? result.rows : [] };
        res.render('pages/yourProf', results);
    });
})
//END OF AMY

const session = require('express-session')({
    name:'session',
    genid: function(req) { return uuidv1();},
    secret: 'mysecret',
    maxAge: 1000 * 60 * 60,
    resave: true,
    saveUninitialized: true,
})
app.use(session);

// Use this function to test if user is an admin -- Pass in req.session.user
function hasPermissions(user) {
    if(user.status == 'admin') {
        return true;
    } else {
        return false;
    }
}

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
    const values = [req.body.username, bcrypt.hashSync(req.body.password, salt), 'user'];

    pool.query('SELECT * FROM users WHERE user_name = $1', [req.body.username], (err, response) =>{

        if(response.rows.length > 0) {
            req.flash('error', 'That username is already in use!');
            res.render('pages/register', {expressFlash: req.flash('error')})
        } else {
            pool.query('INSERT INTO users (user_name, password, status) VALUES ($1, $2, $3)', values, (err, response) => {
                if (err) {
                    console.log(err);
                } else {
                    const sql = {
                        text: 'CREATE TABLE '+ [req.body.username]+'ProfList(prof_fname VARCHAR(32), prof_lname VARCHAR(32), photo_id NUMERIC, catch_time TIMESTAMP DEFAULT now() )'
                    }
                    console.log(sql);
                    pool.query(sql, (err, response) => {
                       if(err) {
                           console.log(err);
                       } else {
                            console.log("proflist made");
                       }
                    });
                    const sql1 = {
                        text: 'CREATE TABLE '+ [req.body.username]+'Inventory(item_name VARCHAR(32), iphoto_id NUMERIC, quantity NUMERIC, item_added TIMESTAMP DEFAULT now())'
                    }
                    console.log(sql1);
                    pool.query(sql1, (err, response) => {
                       if(err) {
                           console.log(err);
                       } else {
                       console.log("Inventory Made");
                       var office="Prof Office Hours";
                       const query = {
                           text: 'INSERT INTO '+ req.body.username+'Inventory (item_name, iphoto_id, quantity) VALUES ($1,1,0)',
                           values: [office]
                       }
                       console.log(query);
                       pool.query(query,(err, response) => {
                             if(err) {
                                 console.log(err);
                             }
                        });
                       }
                    });

                    req.flash('info', "New User Created Successfully. Please Sign-in.");

                    res.render('pages/login', {expressFlashNewUser: req.flash('info')})
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
                        res.redirect('./admin');
                    } else {
                      req.session.encounter_chance = 12;
                      req.session.use_time= 0;
                      req.session.user_name = req.body.username;
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
    res.redirect('pages/login');
  }
});

/* Serve the professor list portion of the admin page */
app.get('/admin_professor', loggedIn, function(req, res) {
    if(hasPermissions(req.session.user) == true){
        res.render('pages/admin_professor');
    }
    else{
        res.redirect('pages/login');
    }
});
/*For navigation to profdex*/
app.get('/user_profDex', loggedIn, function(req,res){
  if(req.session.user){
      res.redirect('/prof.html');
  }
  else{
      res.redirect('pages/login');
  }
});

app.get('/toInventoryGame', async(req, res) => {
    // let sql = format('SELECT * FROM %I', req.query.user+'ProfList');
    // console.log(sql).
    const query = 'SELECT item_name, iphoto_id, quantity, item_added FROM ' + [req.session.user_name]+ 'Inventory';
    console.log(query);
    pool.query(query ,(error, result)=>{
        if(error){
            console.log(error.message);
            res.send('');
        }
        if(result.rowCount == 0){
            console.log('Empty table');
            res.send('');
        }
        const results = { 'results': (result) ? result.rows : null };
        res.status(200);
        res.send(results);
    });

});
app.get('/toInventory', (req, res) => {
    const query = 'SELECT item_name, iphoto_id, quantity, item_added FROM ' + req.query.user + 'Inventory';
    pool.query(query ,(error, result)=>{
        if(error){
            console.log(error.message);
            res.send('');
        }
        const results = { 'results': (result) ? result.rows : null };
        res.status(200);
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

/* Get all the professor data from the DB */
app.get('/dataProfDex', (req, res) =>{
    pool.query("SELECT * FROM profDex", (error, result)=>{
        if(error){
            console.log(error.message);
            res.end();
        }

    const results = { 'results': (result) ? result.rows : null };
    res.send(results);
    });
});

/* Delete a user from the DB */
app.delete('/removeUser/:id', (req, res)=>{

    pool.query('DELETE FROM users WHERE user_name=$1', [req.params.id], function (err, resp) {
      if (err){
        console.log('del failed');
      }
      else {
      }
    })
    const sql = {
        text: 'DROP TABLE '+[req.params.id]+'Inventory'
    }
    pool.query(sql, function (err, resp) {
      if (err){
        console.log('del failed');
      }
      else {
      }
    })
    const sql1 = {
        text: 'DROP TABLE '+[req.params.id]+'ProfList'
    }
    pool.query(sql1, function (err, resp) {
      if (err){
        console.log('del failed');
      }
      else {
      }
    })

    res.send('');

})
app.delete('/removeProf/:id', (req, res)=>{

    pool.query('DELETE FROM profDex WHERE prof_id=$1', [req.params.id], function (err, resp) {
      if (err){
        console.log('del failed');
          res.end();
      }
      else {
        res.end();
      }
    })
})
/**********************************************************/
app.get('/addCandy', function(req,res){
  var test = req.session.user_name;
  console.log(test);
  var itemChance = Math.floor((Math.random() * 100) + 1);
  if(itemChance<=100)
  {
    const sql1 = {
      text: 'UPDATE '+ [req.session.user_name]+'Inventory SET quantity=quantity+1 WHERE quantity>=0'
    }
    pool.query(sql1, (err, response) => {
       if(err) {
           console.log(err);
       } else {
            console.log("items increased");
            res.status(200);
       }

    });
  }
  res.end();
})
app.get('/popAPill',async(req,res)=>{
  console.log(req.session.user_name);
  if(req.session.encounter_chance-Date.now() > 60000){
    alert("Recently Used a Candy");
  }
  else{
    const sql = {
        text: 'SELECT quantity FROM '+[req.session.user_name]+'Inventory'
    }
    pool.query(sql, (err, response) => {
       if(err) {
           console.log(err);
       }
       console.log(response.rows[0].quantity);
       if(req.session.itemUsed != 'true'){

         const sql1 = {
             text: 'UPDATE '+ [req.session.user_name]+'Inventory SET quantity=quantity-1 WHERE quantity>0'
         }
         pool.query(sql1, (err, response) => {
            if(err) {
                console.log(err);
            } else {
                 console.log("Popping pills");
                 req.session.encounter_chance = 4;
                 req.session.itemTime= Date.now();
                 res.status(200);
                }
            });
        }
        else{
            alert("You do not have any Prof Hours left to Visit");
        }

    });
  }
  res.end();
})

app.post('/caught',(req,res)=>{
        //encouter
        // send back and obj, contain img id, prof
        // for testing do console.log

        // TODO: change this to be function call that'll return the prof that they will encounter with all the stats
        // for now send a temp objS
      const sql = {
          text: 'INSERT INTO '+[req.session.user_name]+'ProfList(prof_fname, prof_lname, photo_id) VALUES ($1,$2,$3)',
          values:  [[req.body.data.prof_fname], [req.body.data.prof_lname], req.body.data.photo_id]
      }
      pool.query(sql, (err, response) => {
         if(err) {
             console.log(err);
         } else {
              console.log("prof caught added");
              status(200);
         }
      });


})
app.get('/getUserName', loggedIn,(req, res) => {
    const results = {user_name: req.session.user_name, use_time: req.session.use_time, encounter_chance: req.session.encounter_chance};
    if(Date.now()-results.use_time > 60000){
      req.session.encounter_chance = 12;
      results.encounter_chance = 12;
    }
    res.send(results);
});
// Socket code
  io.on('connection', (socket)=>{
      console.log("User connection established");

      socket.on('disconnect', ()=>{
          console.log('user disconnected');
      })
        // used to determine if a character will
        socket.on('move', function(data){
            // determine
            var c = Math.floor((Math.random() * 100) + 1);
            console.log(c);
            console.log(data);
            if(c%data == 0){
                //encouter
                // send back and obj, contain img id, prof
                // for testing do console.log

                // TODO: change this to be function call that'll return the prof that they will encounter with all the stats
                // for now send a temp obj
                var tempProf = {
                    prof_fname: 'bobby',
                    prof_lname: 'chan',
                    photo_id: '1',
                    questions: ['How old am I?', 'What food do I use most in my examples?'],
                    answers: [['25', '35', 0],['Cakes', 'Cupcakes', 1]]
                }
                socket.emit('encounter', tempProf);
            }

        });
  })

// Socket Code ends here

/* Used to check if a profs photo exists */
app.get('/check-file/:fileName', function(req, res) {
    console.log(req.params.fileName);
    if (fs.existsSync('./public/images/prof_images/' + req.params.fileName)) {
        res.send(true);
    } else {
        res.send(false);
    }
});

/* Add a professor who's photo is already on the server to the DB (ie. only add their information to the DB) */
app.post('/addProfDex/:profName', function(req, res) {
    console.log(req.query);
    let photoID = `${req.query.fname.toUpperCase()}_${req.query.lname.toUpperCase()}`;

    pool.query('SELECT * FROM profdex WHERE photo_id = $1', [photoID], (err, response) =>{
       if(err) {
           console.log(err);
       } else {
           if(response.rows.length > 0) {
               res.send("exists")
           } else {
               let values = [req.query.fname, req.query.lname, photoID];
               pool.query('INSERT INTO profDex (prof_fname, prof_lname, photo_id) VALUES ($1, $2, $3)', values, (err, response) => {
                   if (err) {
                       console.log(err);
                   } else {
                       res.send('success');
                   }
               });
           }
       }
    });
});

/* Upload new professor photo and add professor information to the DB */
app.post('/add-new-prof', loggedIn, function(req, res) {
 let fileName = `${req.body.common.toUpperCase()}_${req.body.lname.toUpperCase()}.jpg`;
    if(req.files.filename){
        var file = req.files.filename,
            type = file.mimetype;
        var uploadpath = __dirname + '/public/images/prof_images/' + fileName;
        file.mv(uploadpath,function(err){
            if(err){
                console.log("File Upload Failed",fileName,err);
                res.end();
            }
            else {
                console.log("File Uploaded",fileName);

                let photoID = `${req.body.fname.toUpperCase()}_${req.body.lname.toUpperCase()}`;

                pool.query('SELECT * FROM profdex WHERE photo_id = $1', [photoID], (err, response) =>{
                    if(err) {
                        console.log(err);
                    } else {

                        if(response.rows.length > 0) {
                            res.send("exists")
                        } else {
                            let values = [uuidv1(), req.query.fname, req.query.lname, photoID];
                            pool.query('INSERT INTO profdex VALUES ($1, $2, $3, $4)', values, (err, response) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    res.redirect('/admin_professor');
                                }
                            });
                        }
                    }
                });
            }
        });
    }
});

/* Changes a user's status from 'user' to 'admin' -- Doesn't delete their game tables though */
app.get('/changeUserStatus', function(req, res) {
    var sql = format("UPDATE %s SET status = %s WHERE user_name = %s", 'users', 'admin', `${req.query.user}`);
    pool.query("UPDATE users SET status = 'admin' WHERE user_name = $1",[req.query.user], (err, response) =>{
        if(err) {
            console.log(err);
        } else {
            res.end();
        }
    });
});

app.post('/updateLocation',async(req,res)=>{
	if (req.session.user_name){
		var sql = "SELECT * FROM userPos WHERE user_name='"+req.session.user_name+"'";
		pool.query(sql, (err, response) => {
			if(err) {
				console.log(err);
			}
			if (response){
				if(response.rows.length > 0) {
					let values = [parseInt(req.query.x),parseInt(req.query.y),String(req.session.user_name)];
					pool.query("UPDATE userPos SET x_pos=$1,y_pos=$2 WHERE user_name=$3", values, (err, response) => {
						if(err) {
							console.log(err);
						}
						else{
							//console.log("updated "+values[2]+"'s position to x="+values[0]+" and y="+values[1]);
						}
					});
				} else {
					let values = [String(req.session.user_name),parseInt(req.query.x),parseInt(req.query.y)];
					pool.query("INSERT INTO userPos(user_name,x_pos,y_pos) VALUES ($1,$2,$3)", values, (err, response) => {
						if(err) {
							console.log(err);
						}
						else{
							//console.log("updated "+values[0]+"'s position to x="+values[1]+" and y="+values[2]);
						}
					});
				}
			}
			else {
				console.log("no response from query");
			}
			res.status(200);
		});
		res.end();
	}
	else {
		console.log("re-log required")
	}
})

app.get('/getLocation',async(req,res)=>{
	if (req.session.user_name){
		var sql = "SELECT * FROM userPos WHERE user_name='"+req.session.user_name+"'";
		pool.query(sql, (err, response) => {
			if(err) {
				console.log(err);
			}
			if(response){
				if(response.rows.length > 0) {
					res.status(200);
					res.send({"x":response.rows[0].x_pos,"y":response.rows[0].y_pos});
				}
				else {
					pool.query("INSERT INTO userPos(user_name) VALUES ($1)", [req.session.user_name], (err, response) => {
						if(err) {
							console.log(err);
						}
						else{
							console.log("created user "+req.session.user_name);
							var sql = "SELECT * FROM userPos WHERE user_name='"+req.session.user_name+"'";
							pool.query(sql, (err, response) => {
								if(err) {
									console.log(err);
								}
								if(response){
									res.status(200);
									res.send({"x":response.rows[0].x_pos,"y":response.rows[0].y_pos});
								}
							});
						}
					});
				}
			}
		})
	}
})
// Change prof_id to uuid
// Change photo_id to varchar

module.exports = app;
>>>>>>> fixed improper additions to main.js
