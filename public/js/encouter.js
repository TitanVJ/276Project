var socket = io();
var encounter = false;
var spawnball = false;
var profInfo;
socket.on('hi', (msg)=>{
    alert(msg);
})

socket.on('no', ()=>{
    console.log('no encounter');
});

socket.on('encounter',(profObj)=>{
    profInfo = profObj;
    spawnball = true;
    encounter = true;
});

$(document).keydown((e)=>{
    // check for wasd only keys 
    if(['w', 'a', 's', 'd'].includes(e.key)){
        socket.emit('move', encounter);
    }
});