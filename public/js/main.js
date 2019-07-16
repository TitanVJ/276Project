var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('background','ig/map.png');
    game.load.image('player','ig/demop.png');
    game.load.image('1', 'ig/1.png');
    game.load.image('2', 'ig/2.png');
    game.load.image('3', 'ig/3.png');
    game.load.image('4', 'ig/4.png');
    game.load.image('5', 'ig/5.png');
    game.load.image('6', 'ig/6.png');
    game.load.image('7', 'ig/7.png');
    game.load.image('8', 'ig/8.png');
    game.load.image('9', 'ig/9.png');
    game.load.image('10', 'ig/10.png');
    game.load.image('11', 'ig/11.png');
    game.load.image('12', 'ig/12.png');
    game.load.image('13', 'ig/13.png');
    game.load.image('14', 'ig/14.png');
    game.load.image('15', 'ig/15.png');
    game.load.image('16', 'ig/16.png');
    game.load.image('17', 'ig/17.png');
    game.load.image('18', 'ig/18.png');
    game.load.image('19', 'ig/19.png');
    game.load.image('20', 'ig/20.png');
    game.load.image('21', 'ig/21.png');
    game.load.image('22', 'ig/22.png');
    game.load.image('23', 'ig/23.png');
    game.load.image('24', 'ig/24.png');
    game.load.image('25', 'ig/25.png');
    game.load.image('26', 'ig/26.png');
    game.load.image('27', 'ig/27.png');
    game.load.image('28', 'ig/28.png');
    game.load.image('29', 'ig/29.png');
    game.load.image('30', 'ig/30.png');
    game.load.image('31', 'ig/31.png');
    game.load.image('32', 'ig/32.png');
    game.load.image('33', 'ig/33.png');
    game.load.image('34', 'ig/34.png');
    game.load.image('35', 'ig/35.png');
    game.load.image('36', 'ig/36.png');
    game.load.image('37', 'ig/37.png');
    game.load.image('38', 'ig/38.png');
    game.load.image('39', 'ig/39.png');
    game.load.image('40', 'ig/40.png');
    game.load.image('41', 'ig/41.png');
    game.load.image('42', 'ig/42.png');
    game.load.image('43', 'ig/43.png');
    game.load.image('44', 'ig/44.png');
    game.load.image('45', 'ig/45.png');
    game.load.image('46', 'ig/46.png');
    game.load.image('47', 'ig/47.png');
    game.load.image('48', 'ig/48.png');
    game.load.image('49', 'ig/49.png');
    game.load.image('50', 'ig/50.png');
    game.load.image('51', 'ig/51.png');
    game.load.image('52', 'ig/52.png');
    game.load.image('53', 'ig/53.png');
    game.load.image('54', 'ig/54.png');
    game.load.image('55', 'ig/55.png');
    game.load.image('56', 'ig/56.png');
    game.load.image('57', 'ig/57.png');
    game.load.image('58', 'ig/58.png');
    game.load.image('59', 'ig/59.png');
}

var player;
var cursors;
var wall;
var playerCollisionGroup;
var wallCollisionGroup;


function create() {

	game.physics.startSystem(Phaser.Physics.P2JS);

    game.add.tileSprite(0,0,10000,5000,'background');

    game.world.setBounds(0, 0, 10000, 5000);

    playerCollisionGroup = this.physics.p2.createCollisionGroup();

    wallCollisionGroup = this.physics.p2.createCollisionGroup();

    //player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
    player = game.add.sprite(1000, 2500, 'player');

    game.physics.p2.enable(player);

    player.body.collideWorldBounds = true;

    player.body.setCollisionGroup(playerCollisionGroup);
    player.body.collides(wallCollisionGroup);
    w1 = game.add.sprite(722,2155, '1');
    
    game.physics.p2.enable(w1);

    w1.body.setCollisionGroup(wallCollisionGroup);
   	w1.body.collides(playerCollisionGroup);

   	w1.body.static = true;

    w2 = game.add.sprite(1170,1950, '2');

    game.physics.p2.enable(w2);

    w2.body.setCollisionGroup(wallCollisionGroup);
    w2.body.collides(playerCollisionGroup);

    w2.body.static = true;

    w3 = game.add.sprite(382,2580, '3');

    w3.scale.setTo(1.3, 1.3);

    game.physics.p2.enable(w3);

    w3.body.setCollisionGroup(wallCollisionGroup);
    w3.body.collides(playerCollisionGroup);

    w3.body.static = true;

    w4 = game.add.sprite(745,2860, '4');

    w4.scale.setTo(1.5, 1.7);

    game.physics.p2.enable(w4);

    w4.body.setCollisionGroup(wallCollisionGroup);
    w4.body.collides(playerCollisionGroup);

    w4.body.static = true;

    w5 = game.add.sprite(1740,2780, '5');

   // w5.scale.setTo(1.5, 1.7);

    game.physics.p2.enable(w5);

    w5.body.setCollisionGroup(wallCollisionGroup);
    w5.body.collides(playerCollisionGroup);

    w5.body.static = true;




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
    }
    else if (cursors.right.isDown)
    {
		player.body.velocity.x = 300;    
	}

    if (cursors.up.isDown)
    {
        player.body.velocity.y = -300;
    }
    else if (cursors.down.isDown)
    {
    	player.body.velocity.y = 300;
    }

    


}

function render() {
    game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.spriteCoords(player, 32, 500);
}

