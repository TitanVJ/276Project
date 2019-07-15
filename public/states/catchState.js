class catchState extends Phaser.State {
    question = [];

    init(profData){

    }

    preload(){
        //need background image, for now use same background as main state
        //need prof image
        this.game.load.image('prof', '../images/')

    }

    create(){
        game.add.tileSprite(0,0,1000,1000,'background');

    }

    update(){

    }
}