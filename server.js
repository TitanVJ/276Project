const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 8080;
const http = require("http");
const app = express();
// const server = http.createServer(app).listen(PORT);
const server =  app.listen(PORT, ()=>{console.log("Magic is happening on port " + PORT);});
const io = require("socket.io")(server);

// socket code
io.on('connection', (socket)=>{
    console.log("User connection established");

    socket.on('disconnect', ()=>{
        console.log('user disconnected');
    })

    // used to determine if a character will 
    socket.on('move', (data)=>{
        // determine
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
            }
            socket.emit('encounter', tempProf);
        }
        else{
            socket.emit('no');
        }
    })
})
// socket code


app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// app.listen(PORT, ()=>{console.log("Magic is happening on port " + PORT);});
