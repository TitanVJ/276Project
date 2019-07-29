var socket = io();
var encounter = false;
var spawnball = false;
var profInfo;


var useTime = 0;
var sessionUserName;

// Control modal the appears when a user is clicked in the user list on the admin page
$('#user_invent').on('show.bs.modal', function (e) {
    $('#modal_title').html("Inventory for " + e.relatedTarget.id)
    $('#use_item').attr('data-user-id', e.relatedTarget.id);

    $.ajax({
        method: 'GET',
        url: `/toInventory?user=${e.relatedTarget.id}`,
        success: function(data) {
            $('#item_body').empty();
            $.each(data.results, function() {
                $('<tr>').attr('id', `${this.iphoto_id}`).appendTo('#item_body');
                $('<td>').html(`${this.item_name}`).appendTo('#'+this.iphoto_id);
                $('<td>').html(`${this.quantity}`).appendTo('#'+this.iphoto_id);

            });

        }
    });
});

$('#use_item').confirmation({
    rootSelector: '[data-toggle=confirmation]',
    onConfirm: function () {
        // Just changes the user status but does not drop the tables that only applied to them when they were a user.
        if(Date.now()-useTime >= 60000){
          $.ajax({
              method: 'GET',
              url: `/popAPill`,
              success(data) {
                useTime = Date.now();
              }
          });
          console.log("Confirm");
        }
        else{
          alert("You have recently used an Office Hour, please wait");
        }
    }
});



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
// document.getElementById("add").addEventListener("click", function(a){
//   $.ajax({
//       method:'get',
//       url:'/addCandy',
//       success: function() {
//           alert("Office hours has been added!");
//       },
//       error: ()=>{alert('Failed to add.')}
//   });
// })
// document.getElementById("use").addEventListener("click", function(a){
//   $.ajax({
//       method:'get',
//       url:'/popAPill',
//       success: function() {
//           alert('Office hours has been used!');
//       },
//       error: ()=>{alert('Failed to use.')}
//   });
// })
// document.getElementById("logout").addEventListener("click", function(a){
//   $.ajax({
//       method:'get',
//       url:'/logout',
//       success: '/',
//       error: ()=>{alert('Failed to Logout.')}
//   });
// })

$(document).keydown((e)=>{
    // check for wasd only keys
    if(['w', 'a', 's', 'd'].includes(e.key)){
      if(Date.now()-useTime){
        socket.emit('changeEncounter');
      }

      socket.emit('move', encounter);
    }
});
