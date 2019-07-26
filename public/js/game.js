// import the states and
import main from './main.js';
import catchState from '../states/catchState.js';


document.getElementById("userInv").addEventListener("click", userInv);

class Game extends Phaser.Game {
    constructor(){
        super($(window).width(), ($(window).height()-145), Phaser.CANVAS, 'phaser');

        // add states
        this.state.add('main', main);
        this.state.add('catchState', catchState);

        this.state.start('main');
    }
}

new Game();

// function userInv(e) {
//
//
//     $.ajax({
//         method: 'GET',
//         url: '/toInventoryGame',
//         success: function(data) {
//             $('#item_body').empty();
//             $.each(data.results, function() {
//                 $('<tr>').attr('id', `${this.iphoto_id}`).appendTo('#item_body');
//                 $('<td>').html(`${this.item_name}`).appendTo('#'+this.iphoto_id);
//                 $('<td>').html(`${this.quantity}`).appendTo('#'+this.iphoto_id);
//
//             });
//
//         }
//     });
//
// };
