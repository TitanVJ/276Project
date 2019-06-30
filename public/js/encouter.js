var keyStatus = $('#key')[0];
var count = $('#counter')[0];
var moves = $('#moves')[0];

var socket = io('localhost:8080');

socket.on('hi', (msg)=>{
    alert(msg);
})

socket.on('no', ()=>{
    console.log('no encounter');
});

socket.on('encounter',()=>{
    count.innerHTML++;
});

$(document).keydown((e)=>{
    // check for wasd only keys 
    if(['w', 'a', 's', 'd'].includes(e.key)){
        keyStatus.innerHTML = e.key.toUpperCase();
        moves.innerHTML++;
        socket.emit('move');
    }
});