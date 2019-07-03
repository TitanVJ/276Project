const express = require('express')
var format = require('pg-format');
const path = require('path')
const PORT = process.env.PORT || 5000

const { Pool } = require('pg');
const pool = new Pool({ 
    connectionString:process.env.DATABASE_URL
 });
 const app = express();
app.listen(PORT, ()=>{console.log("its working on "+PORT);})

var options = {
    index: "prof.html"
}

app.use(express.static(path.join(__dirname, 'public'), options))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.set('views', path.join(__dirname, 'views'))

/*
app.get('/dataProfDex', (req, res)=>{
    console.log('hi');
    //pool.query("SELECT prof_fname,prof_lname,photo_id FROM profDex", (error, result)=>{
    pool.query("SELECT * FROM profDex", (error, result)=>{
        console.log(result);
        if(error){
            console.log(error.message);
            res.status('500');
            res.send('');
        }
        console.log(result);
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


app.get('/searchProfDex', function(req, res){
    const query = {
        text: 'SELECT prof_fname, prof_lname, photo_id FROM profDex WHERE ' + req.query.column + '=$1',
        values: [req.query.value]
    }
    pool.query(query, (error, result) => {
        if(error){
            console.log(error.message);
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
*/



