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
document.getElementById("add").addEventListener("click", function(a){
  $.ajax({
      method:'get',
      url:'/addCandy',
      success: function() {
          alert("Office hours has been added!");
      },
      error: ()=>{alert('Failed to add.')}
  });
})
document.getElementById("use").addEventListener("click", function(a){
  $.ajax({
      method:'get',
      url:'/popAPill',
      success: function() {
          alert('Office hours has been used!');
      },
      error: ()=>{alert('Failed to use.')}
  });
})
document.getElementById("logout").addEventListener("click", function(a){
  $.ajax({
      method:'get',
      url:'/logout',
      success: '/',
      error: ()=>{alert('Failed to Logout.')}
  });
})

$(document).keydown((e)=>{
    // check for wasd only keys 
    if(['w', 'a', 's', 'd'].includes(e.key)){
        socket.emit('move', encounter);
    }
});
