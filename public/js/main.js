

// var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser', { preload: preload, create: create, update: update, render: render });
class main extends Phaser.State { 
    
    init(){
        this.player;
        this.sprite;
        this.cursors;
        this.wall;
        this.playerCollisionGroup;
        this.wallCollisionGroup;        

        this.w;
        this.a;
        this.s;
        this.d;
    }

    preload() {

        this.game.load.image('background','images/background.png');
        this.game.load.image('player','images/demop.png');
        this.game.load.image('profeball', 'images/encIndicator.png');
    }

    create() {

        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.setImpactEvents(true);


        this.game.add.tileSprite(0,0,1000,1000,'background');

        this.game.world.setBounds(0, 0, 1000, 1000);

        this.playerCollisionGroup = this.game.physics.p2.createCollisionGroup();

        this.wallCollisionGroup = this.game.physics.p2.createCollisionGroup();

        this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'player');

        this.game.physics.p2.enable(this.player);

        this.player.body.collideWorldBounds = true;

        this.player.body.setCollisionGroup(this.playerCollisionGroup);
        this.player.body.collides(this.wallCollisionGroup);

        this.sprite = this.game.add.sprite(550,550, 'wall');


        //problem mi se desava ovdje, nece da pusti da na
        
        this.game.physics.p2.enable(this.sprite);

        this.sprite.body.setCollisionGroup(this.wallCollisionGroup);
        this.sprite.body.collides(this.playerCollisionGroup);

        this.sprite.body.static = true;

        this.sprite2 = this.game.add.sprite(550,510, 'wall');

        this.game.physics.p2.enable(this.sprite2);

        this.sprite2.body.setCollisionGroup(this.wallCollisionGroup);
        this.sprite2.body.collides(this.playerCollisionGroup);

        this.sprite2.body.static = true;

        this.game.camera.follow(this.player);

        // this.cursors = this.game.input.keyboard.createCursorKeys();
        this.w = this.game.input.keyboard.addKey(Phaser.KeyCode.W);
        this.a = this.game.input.keyboard.addKey(Phaser.KeyCode.A);
        this.s = this.game.input.keyboard.addKey(Phaser.KeyCode.S);
        this.d = this.game.input.keyboard.addKey(Phaser.KeyCode.D);

        // this.player.setCollideWorldBounds(true);

    }

    update() {
        this.player.body.fixedRotation = true;

        this.player.body.setZeroVelocity();
        
        if (this.a.isDown)
        {
            this.player.body.velocity.x = -300;
        }
        else if (this.d.isDown)
        {
            this.player.body.velocity.x = 300;
        }

        if (this.w.isDown)
        {
            this.player.body.velocity.y = -300;
        }
        else if (this.s.isDown)
        {
            this.player.body.velocity.y = 300;
        }

        if(spawnball){ 
            spawnball = false;
            this.spawn();
        }
        

    } // update ends here

    spawn(){
        //spawn the obj

        this.x = this.player.x + Math.floor(Math.random() * (5 - (-5))) + (-5);
        this.y = this.player.y + Math.floor(Math.random() * (5 - (-5))) + (-5);

        this.ball = this.game.add.sprite(this.x, this.y, 'profeball');

        this.ball.inputEnabled = true;
        this.ball.events.onInputDown.add(this.listner, this, this.ball);
        this.ball.scale.setTo(0.05, 0.05);

        setTimeout(()=>{encounter=false;this.ball.destroy();}, 13000);

    }

    listner(ball){
        ball.destroy();
        this.state.start('catchState', true, false, profInfo);

    }
} // class ends here

export default main;