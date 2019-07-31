// import the states and
import main from './main.js';
import catchState from '../states/catchState.js';

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

class Game extends Phaser.Game {
    constructor(){

        super($(window).width(), ($(window).height()-145), Phaser.CANVAS, 'phaser');
        // add states
        this.state.add('main', main);
        this.state.add('catchState', catchState);

        this.state.start('main');
    }
}
//
new Game();
