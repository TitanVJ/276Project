const express = require('express')
var format = require('pg-format');
const path = require('path')
const PORT = process.env.PORT || 5000

const { Pool } = require('pg');

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

var pool = new Pool({
  connectionString : process.env.DATABASE_URL
});
const app = express();


app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set('views', path.join(__dirname, 'views'))
/*******************/
app.get('/search', (req, res)=>{
    const query = {
        text: 'SELECT user_name,status,last_updated,record_created FROM users WHERE ' + req.query.column + '=$1',
        values: [req.query.value]
    }
    pool.query(query, (err, result)=>{
        if(err){
            console.log(err.message);
            res.status('500');
            return res.send('');
        }
        else if(result.rowCount == 0){
            // console.log(result)
            console.log('Empty table');
            res.status('500');
            return res.send('');
        }

        const results = { 'results': (result) ? result.rows : null };
        res.status(200);
        res.send(results);
    });

});
app.get('/searchProfDex', (req, res)=>{
    const query = {
        text: 'SELECT prof_fname,prof_lname,photo_id, last_updated, record_created FROM profDex WHERE ' + req.query.column + '=$1',
        values: [req.query.value]
    }
    pool.query(query, (err, result)=>{
        if(err){
            console.log(err.message);
            res.status('500');
            return res.send('');
        }
        else if(result.rowCount == 0){
            // console.log(result)
            console.log('Empty table');
            res.status('500');
            return res.send('');
        }

        const results = { 'results': (result) ? result.rows : null };
        res.status(200);
        res.send(results);
    });

});
/***************************************/
app.get('/toTable', (req, res)=>{
    var tableName = req.query.user
    sql = format('SELECT * FROM %I', req.query.user);
    pool.query(sql ,(err, result)=>{
        if(err){
            console.log(err.message);
            res.status('500');
            return res.send('');
        }
        else if(result.rowCount == 0){
            // console.log(result)
            console.log('Empty table');
            res.status('500');
            return res.send('');
        }

        const results = { 'results': (result) ? result.rows : null };
        res.status(200);
        res.render('pages/userproflist', results );
        res.redirect('pages/userproflist');
    });

});
/**************************************/
app.get('/data', (req, res)=>{
    pool.query("select user_name,status,last_updated,record_created FROM users", (error, result)=>{
        if(error){
            console.log(error.message);
            res.status('500');
            res.send('');
        }
        if(result.rowCount == 0){
            console.log('Empty table');
            res.status('500');
            res.send('');
        }
    const results = { 'results': (result) ? result.rows : null };
    res.status(200);
    res.send(results);
    });
});
app.get('/dataProfDex', (req, res)=>{
    pool.query("SELECT prof_fname,prof_lname,photo_id,last_updated,record_created FROM profDex", (error, result)=>{
        if(error){
            console.log(error.message);
            res.status('500');
            res.send('');
        }
        if(result.rowCount == 0){
            console.log('Empty table');
            res.status('500');
            res.send('');
        }
    const results = { 'results': (result) ? result.rows : null };
    res.status(200);
    res.send(results);
    });
})
/**********************************/
app.delete('/removeUser/:id', (req, res)=>{

    console.log('del start');
    pool.query('DELETE FROM users WHERE user_name=$1', [req.params.id], function (err, resp) {
      if (err){
        console.log('del failed');
      }
      else {
        console.log('del suc');
      }
    })

})

  app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
