var keyStatus = $('#key')[0];
var count = $('#counter')[0];
var moves = $('#moves')[0];

var socket = io('localhost:8080');
var encounter = false;

socket.on('hi', (msg)=>{
    alert(msg);
})

socket.on('no', ()=>{
    console.log('no encounter');
});

socket.on('encounter',(profObj)=>{
    encounter = true;
    count.innerHTML++;
    // this will make a coffee cup?(something icon) appear on teh map that user will click to engage capture mode
    var img = $('#tempEncounter')[0];
    img.src = '../images/crocker.png';

    var details = $('#profDetails')[0];
    details.innerHTML = JSON.stringify(profObj);

    // this will later be adapted to delete the spawned icon if the user doesn't click on it in time
    setTimeout(()=>{encounter=false;img.src = '';details.innerHTML = ''; console.log('removed img');}, 30000);
});

$(document).keydown((e)=>{
    // check for wasd only keys 
    if(['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'].includes(e.key)){
        keyStatus.innerHTML = e.key.toUpperCase();
        moves.innerHTML++;
        socket.emit('move', encounter);
    }
});