var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('background','images/background.png');
    game.load.image('player','images/demop.png');
    //game.load.image('wall', 'wall.png');

}

var player;
var sprite;
var cursors;
var wall;
var playerCollisionGroup;
var wallCollisionGroup;


function create() {

	game.physics.startSystem(Phaser.Physics.P2JS);

    game.add.tileSprite(0,0,1000,1000,'background');

    game.world.setBounds(0, 0, 1000, 1000);

    playerCollisionGroup = this.physics.p2.createCollisionGroup();

    wallCollisionGroup = this.physics.p2.createCollisionGroup();

    player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');

    game.physics.p2.enable(player);

    player.body.collideWorldBounds = true;

    player.body.setCollisionGroup(playerCollisionGroup);
    player.body.collides(wallCollisionGroup);

    sprite = game.add.sprite(550,550, 'wall');


    //problem mi se desava ovdje, nece da pusti da na
    
    game.physics.p2.enable(sprite);

    sprite.body.setCollisionGroup(wallCollisionGroup);
   	sprite.body.collides(playerCollisionGroup);

   	sprite.body.static = true;

    sprite2 = game.add.sprite(550,510, 'wall');

    game.physics.p2.enable(sprite2);

    sprite2.body.setCollisionGroup(wallCollisionGroup);
    sprite2.body.collides(playerCollisionGroup);

    sprite2.body.static = true;

    game.camera.follow(player);

    cursors = game.input.keyboard.createCursorKeys();

    player.setCollideWorldBounds(true);

}


function update() {

	player.body.fixedRotation = true;

    player.body.setZeroVelocity();

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -300;
        move('left');
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 300;
        move('right');
            
	}

    if (cursors.up.isDown)
    {
        player.body.velocity.y = -300;
        move('up');

    }
    else if (cursors.down.isDown)
    {
        player.body.velocity.y = 300;
        move('down');
        
    }

    


}

function render() {

}

//VJ's encounter code

var keyStatus = $('#key')[0];
var count = $('#counter')[0];
var moves = $('#moves')[0];

var socket = io();
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

function move(key){
        keyStatus.innerHTML = key.toUpperCase();
        moves.innerHTML++;
        socket.emit('move', encounter);
}