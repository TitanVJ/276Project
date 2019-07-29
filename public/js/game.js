// import the states and 
import main from './main.js';
import catchState from '../states/catchState.js';

class Game extends Phaser.Game {
    constructor(){
        super(800, 600, Phaser.CANVAS, 'phaser');

        // add states
        this.state.add('main', main);
        this.state.add('catchState', catchState);
        
        this.state.start('main');
    }
}

new Game();