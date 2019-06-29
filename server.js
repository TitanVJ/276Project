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

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('pages/login'));
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));