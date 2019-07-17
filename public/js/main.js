

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

        this.game.load.image('background','ig/map.png');
        this.game.load.image('player','ig/demop.png');
        this.game.load.image('1', 'ig/1.png');
        this.game.load.image('2', 'ig/2.png');
        this.game.load.image('3', 'ig/3.png');
        this.game.load.image('4', 'ig/4.png');
        this.game.load.image('5', 'ig/5.png');
        this.game.load.image('6', 'ig/6.png');
        this.game.load.image('7', 'ig/7.png');
        this.game.load.image('8', 'ig/8.png');
        this.game.load.image('9', 'ig/9.png');
        this.game.load.image('10', 'ig/10.png');
        this.game.load.image('11', 'ig/11.png');
        this.game.load.image('12', 'ig/12.png');
        this.game.load.image('13', 'ig/13.png');
        this.game.load.image('14', 'ig/14.png');
        this.game.load.image('15', 'ig/15.png');
        this.game.load.image('16', 'ig/16.png');
        this.game.load.image('17', 'ig/17.png');
        this.game.load.image('18', 'ig/18.png');
        this.game.load.image('19', 'ig/19.png');
        this.game.load.image('20', 'ig/20.png');
        this.game.load.image('21', 'ig/21.png');
        this.game.load.image('22', 'ig/22.png');
        this.game.load.image('23', 'ig/23.png');
        this.game.load.image('24', 'ig/24.png');
        this.game.load.image('25', 'ig/25.png');
        this.game.load.image('26', 'ig/26.png');
        this.game.load.image('27', 'ig/27.png');
        this.game.load.image('28', 'ig/28.png');
        this.game.load.image('29', 'ig/29.png');
        this.game.load.image('30', 'ig/30.png');
        this.game.load.image('31', 'ig/31.png');
        this.game.load.image('32', 'ig/32.png');
        this.game.load.image('33', 'ig/33.png');
        this.game.load.image('34', 'ig/34.png');
        this.game.load.image('35', 'ig/35.png');
        this.game.load.image('36', 'ig/36.png');
        this.game.load.image('37', 'ig/37.png');
        this.game.load.image('38', 'ig/38.png');
        this.game.load.image('39', 'ig/39.png');
        this.game.load.image('40', 'ig/40.png');
        this.game.load.image('41', 'ig/41.png');
        this.game.load.image('42', 'ig/42.png');
        this.game.load.image('43', 'ig/43.png');
        this.game.load.image('44', 'ig/44.png');
        this.game.load.image('45', 'ig/45.png');
        this.game.load.image('46', 'ig/46.png');
        this.game.load.image('47', 'ig/47.png');
        this.game.load.image('48', 'ig/48.png');
        this.game.load.image('49', 'ig/49.png');
        this.game.load.image('50', 'ig/50.png');
        this.game.load.image('51', 'ig/51.png');
        this.game.load.image('52', 'ig/52.png');
        this.game.load.image('53', 'ig/53.png');
        this.game.load.image('54', 'ig/54.png');
        this.game.load.image('55', 'ig/55.png');
        this.game.load.image('56', 'ig/56.png');
        this.game.load.image('57', 'ig/57.png');
        this.game.load.image('58', 'ig/58.png');
        this.game.load.image('59', 'ig/59.png');
        this.game.load.image('60', 'ig/60.png');
        this.game.load.image('61', 'ig/61.png');
    
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

        this.w1 = this.game.add.sprite(722,2155, '1');
        
        this.game.physics.p2.enable(w1);

        this.w1.body.setCollisionGroup(this.wallCollisionGroup);
        this.w1.body.collides(this.playerCollisionGroup);

        this.w1.body.static = true;

        this.w2 = this.game.add.sprite(1170,1950, '2');

        this.game.physics.p2.enable(this.w2);

        this.w2.body.setCollisionGroup(this.wallCollisionGroup);
        this.w2.body.collides(this.playerCollisionGroup);

        this.w2.body.static = true;

        this.w3 = this.game.add.sprite(382,2580, '3');

        this.w3.scale.setTo(1.7, 1.3);

        game.physics.p2.enable(this.w3);

        this.w3.body.setCollisionGroup(this.wallCollisionGroup);
        this.w3.body.collides(this.playerCollisionGroup);

        this.w3.body.static = true;

        this.w4 = this.game.add.sprite(745,2860, '4');

        this.w4.scale.setTo(1.5, 1.7);

        this.game.physics.p2.enable(this.w4);

        this.w4.body.setCollisionGroup(this.wallCollisionGroup);
        this.w4.body.collides(this.playerCollisionGroup);

        this.w4.body.static = true;

        this.w5 = this.game.add.sprite(1740,2780, '5');

        this.game.physics.p2.enable(this.w5);

        this.w5.body.setCollisionGroup(this.wallCollisionGroup);
        this.w5.body.collides(this.playerCollisionGroup);

        this.w5.body.static = true;

        this.w6 = this.game.add.sprite(3525,2540, '6');

        this.w6.scale.setTo(1, 1);

        this.game.physics.p2.enable(this.w6);

        this.w6.body.setCollisionGroup(this.wallCollisionGroup);
        this.w6.body.collides(this.playerCollisionGroup);

        this.w6.body.static = true;

        this.w7 = this.game.add.sprite(4775,2655, '7');

        this.w7.scale.setTo(1, 1);

        this.game.physics.p2.enable(this.w7);

        this.w7.body.setCollisionGroup(this.wallCollisionGroup);
        this.w7.body.collides(this.playerCollisionGroup);

        this.w7.body.static = true;

        this.w8 = game.add.sprite(4915,2980, '8');

        this.w8.scale.setTo(1.5, 1);

        this.game.physics.p2.enable(this.w8);

        this.w8.body.setCollisionGroup(this.wallCollisionGroup);
        this.w8.body.collides(this.playerCollisionGroup);

        this.w8.body.static = true;

        this.w9 = game.add.sprite(5148,3135, '9');

        this.w9.scale.setTo(1, 2);

        this.game.physics.p2.enable(this.w9);

        this.w9.body.setCollisionGroup(this.wallCollisionGroup);
        this.w9.body.collides(this.playerCollisionGroup);

        this.w9.body.static = true;

        this.w10 = this.game.add.sprite(5440,2980, '10');

        this.w10.scale.setTo(1, 1);

        this.game.physics.p2.enable(this.w10);

        this.w10.body.setCollisionGroup(this.wallCollisionGroup);
        this.w10.body.collides(this.playerCollisionGroup);

        this.w10.body.static = true;

        this.w11 = this.game.add.sprite(5730,3051, '11');

        this.w11.scale.setTo(1, 1.5);

        this.game.physics.p2.enable(this.w11);

        this.w11.body.setCollisionGroup(this.wallCollisionGroup);
        this.w11.body.collides(this.playerCollisionGroup);

        this.w11.body.static = true;

        this.w12 = this.game.add.sprite(6040,2935, '12');

        this.w12.scale.setTo(1, 1);

        this.game.physics.p2.enable(this.w12);

        this.w12.body.setCollisionGroup(this.wallCollisionGroup);
        this.w12.body.collides(this.playerCollisionGroup);

        this.w12.body.static = true;

        this.w13 = this.game.add.sprite(6819,3060, '13');

        this.w13.scale.setTo(1, 1);

        game.physics.p2.enable(this.w13);

        this.w13.body.setCollisionGroup(this.wallCollisionGroup);
        this.w13.body.collides(this.playerCollisionGroup);

        this.w13.body.static = true;

        this.w14 = game.add.sprite(7403,3430, '14');

        this.w14.scale.setTo(2.2, 1);

        this.game.physics.p2.enable(this.w14);

        this.w14.body.setCollisionGroup(this.wallCollisionGroup);
        this.w14.body.collides(this.playerCollisionGroup);

        this.w14.body.static = true;

        this.w15 = this.game.add.sprite(7391,3975, '15');

        this.w15.scale.setTo(1, 1);

        this.game.physics.p2.enable(this.w15);

        this.w15.body.setCollisionGroup(this.wallCollisionGroup);
        this.w15.body.collides(this.playerCollisionGroup);

        this.w15.body.static = true;

        this.w16 = game.add.sprite(7200,4100, '16');

        this.w16.scale.setTo(1, 1);

        this.game.physics.p2.enable(this.w16);

        this.w16.body.setCollisionGroup(this.wallCollisionGroup);
        this.w16.body.collides(this.playerCollisionGroup);

        this.w16.body.static = true;

<<<<<<< HEAD
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
=======
    w17 = game.add.sprite(7433,4230, '17');

    w17.scale.setTo(1, 1);

    game.physics.p2.enable(w17);

    w17.body.setCollisionGroup(wallCollisionGroup);
    w17.body.collides(playerCollisionGroup);

    w17.body.static = true;

    w18 = game.add.sprite(7850,4210, '18');

    w18.scale.setTo(1, 1);

    game.physics.p2.enable(w18);

    w18.body.setCollisionGroup(wallCollisionGroup);
    w18.body.collides(playerCollisionGroup);

    w18.body.static = true;

    w19 = game.add.sprite(8078,4180, '19');

    w19.scale.setTo(1, 1);

    game.physics.p2.enable(w19);

    w19.body.setCollisionGroup(wallCollisionGroup);
    w19.body.collides(playerCollisionGroup);

    w19.body.static = true;

    w20 = game.add.sprite(8367,4173, '20');

    w20.scale.setTo(1, 1);

    game.physics.p2.enable(w20);

    w20.body.setCollisionGroup(wallCollisionGroup);
    w20.body.collides(playerCollisionGroup);

    w20.body.static = true;

    w21 = game.add.sprite(8628,4136, '21');

    w21.scale.setTo(1, 1);

    game.physics.p2.enable(w21);

    w21.body.setCollisionGroup(wallCollisionGroup);
    w21.body.collides(playerCollisionGroup);

    w21.body.static = true;

    w22 = game.add.sprite(8615,4080, '22');

    w22.scale.setTo(1, 1);

    game.physics.p2.enable(w22);

    w22.body.setCollisionGroup(wallCollisionGroup);
    w22.body.collides(playerCollisionGroup);

    w22.body.static = true;

    w23 = game.add.sprite(8595,4000, '23');

    w23.scale.setTo(1, 1);

    game.physics.p2.enable(w23);

    w23.body.setCollisionGroup(wallCollisionGroup);
    w23.body.collides(playerCollisionGroup);

    w23.body.static = true;

    w24 = game.add.sprite(8348,3945, '24');

    w24.scale.setTo(1, 1);

    game.physics.p2.enable(w24);

    w24.body.setCollisionGroup(wallCollisionGroup);
    w24.body.collides(playerCollisionGroup);

    w24.body.static = true;

    w25 = game.add.sprite(7955,3845, '25');

    w25.scale.setTo(1, 1);

    game.physics.p2.enable(w25);

    w25.body.setCollisionGroup(wallCollisionGroup);
    w25.body.collides(playerCollisionGroup);

    w25.body.static = true;

    w26 = game.add.sprite(8079,3583, '26');

    w26.scale.setTo(1, 1);

    game.physics.p2.enable(w26);

    w26.body.setCollisionGroup(wallCollisionGroup);
    w26.body.collides(playerCollisionGroup);

    w26.body.static = true;

    w27 = game.add.sprite(8060,3403, '27');

    w27.scale.setTo(1, 1);

    game.physics.p2.enable(w27);

    w27.body.setCollisionGroup(wallCollisionGroup);
    w27.body.collides(playerCollisionGroup);

    w27.body.static = true;

    w28 = game.add.sprite(8075,3240, '28');

    w28.scale.setTo(1, 1);

    game.physics.p2.enable(w28);

    w28.body.setCollisionGroup(wallCollisionGroup);
    w28.body.collides(playerCollisionGroup);

    w28.body.static = true;

    w29 = game.add.sprite(8053,3010, '29');

    w29.scale.setTo(1, 1);

    game.physics.p2.enable(w29);

    w29.body.setCollisionGroup(wallCollisionGroup);
    w29.body.collides(playerCollisionGroup);

    w29.body.static = true;

    w30 = game.add.sprite(7940,2893, '30');

    w30.scale.setTo(1, 1);

    game.physics.p2.enable(w30);

    w30.body.setCollisionGroup(wallCollisionGroup);
    w30.body.collides(playerCollisionGroup);

    w30.body.static = true;

    w31 = game.add.sprite(7758,2930, '31');

    w31.scale.setTo(1.01, 1.1);

    game.physics.p2.enable(w31);

    w31.body.setCollisionGroup(wallCollisionGroup);
    w31.body.collides(playerCollisionGroup);

    w31.body.static = true;
    
    w32 = game.add.sprite(7070,2200, '32');

    w32.scale.setTo(1, 1);

    game.physics.p2.enable(w32);

    w32.body.setCollisionGroup(wallCollisionGroup);
    w32.body.collides(playerCollisionGroup);

    w32.body.static = true;

    w33 = game.add.sprite(7465,1534, '33');

    w33.scale.setTo(0.95, 4);

    game.physics.p2.enable(w33);

    w33.body.setCollisionGroup(wallCollisionGroup);
    w33.body.collides(playerCollisionGroup);

    w33.body.static = true;

    w34 = game.add.sprite(8379,1480, '34');

    w34.scale.setTo(3, 1);

    game.physics.p2.enable(w34);

    w34.body.setCollisionGroup(wallCollisionGroup);
    w34.body.collides(playerCollisionGroup);

    w34.body.static = true;

    w35 = game.add.sprite(7582,1350, '35');

    w35.scale.setTo(1, 1);

    game.physics.p2.enable(w35);

    w35.body.setCollisionGroup(wallCollisionGroup);
    w35.body.collides(playerCollisionGroup);

    w35.body.static = true;

    w36 = game.add.sprite(6582,1253, '36');

    w36.scale.setTo(1, 1.5);

    game.physics.p2.enable(w36);

    w36.body.setCollisionGroup(wallCollisionGroup);
    w36.body.collides(playerCollisionGroup);

    w36.body.static = true;

    w37 = game.add.sprite(6320,1355, '37');

    w37.scale.setTo(1, 1);

    game.physics.p2.enable(w37);

    w37.body.setCollisionGroup(wallCollisionGroup);
    w37.body.collides(playerCollisionGroup);

    w37.body.static = true;

    w38 = game.add.sprite(6000,1400, '38');

    w38.scale.setTo(1, 1);

    game.physics.p2.enable(w38);

    w38.body.setCollisionGroup(wallCollisionGroup);
    w38.body.collides(playerCollisionGroup);

    w38.body.static = true;

    w39 = game.add.sprite(5600,1330, '39');

    w39.scale.setTo(1, 1);

    game.physics.p2.enable(w39);

    w39.body.setCollisionGroup(wallCollisionGroup);
    w39.body.collides(playerCollisionGroup);

    w39.body.static = true;

    w40 = game.add.sprite(5186,1210, '40');

    w40.scale.setTo(1, 1);

    game.physics.p2.enable(w40);

    w40.body.setCollisionGroup(wallCollisionGroup);
    w40.body.collides(playerCollisionGroup);

    w40.body.static = true;

    w41 = game.add.sprite(4778,1548, '41');

    w41.scale.setTo(1, 1);

    game.physics.p2.enable(w41);

    w41.body.setCollisionGroup(wallCollisionGroup);
    w41.body.collides(playerCollisionGroup);

    w41.body.static = true;

    w42 = game.add.sprite(4555,1919, '42');

    w42.scale.setTo(1, 1);

    game.physics.p2.enable(w42);

    w42.body.setCollisionGroup(wallCollisionGroup);
    w42.body.collides(playerCollisionGroup);

    w42.body.static = true;

    w43 = game.add.sprite(4472,1812, '43');

    w43.scale.setTo(3, 1);

    game.physics.p2.enable(w43);

    w43.body.setCollisionGroup(wallCollisionGroup);
    w43.body.collides(playerCollisionGroup);

    w43.body.static = true;

    w44 = game.add.sprite(3940,1640, '44');

    w44.scale.setTo(1, 1);

    game.physics.p2.enable(w44);

    w44.body.setCollisionGroup(wallCollisionGroup);
    w44.body.collides(playerCollisionGroup);

    w44.body.static = true;

    w45 = game.add.sprite(2940,1810, '45');

    w45.scale.setTo(1, 1);

    game.physics.p2.enable(w45);

    w45.body.setCollisionGroup(wallCollisionGroup);
    w45.body.collides(playerCollisionGroup);

    w45.body.static = true;

    w46 = game.add.sprite(2330,1949, '46');

    w46.scale.setTo(1, 1);

    game.physics.p2.enable(w46);

    w46.body.setCollisionGroup(wallCollisionGroup);
    w46.body.collides(playerCollisionGroup);

    w46.body.static = true;

    w47 = game.add.sprite(2434,1870, '47');

    w47.scale.setTo(1, 1);

    game.physics.p2.enable(w47);

    w47.body.setCollisionGroup(wallCollisionGroup);
    w47.body.collides(playerCollisionGroup);

    w47.body.static = true;

    w48 = game.add.sprite(2425,1775, '48');

    w48.scale.setTo(1, 1);

    game.physics.p2.enable(w48);

    w48.body.setCollisionGroup(wallCollisionGroup);
    w48.body.collides(playerCollisionGroup);

    w48.body.static = true;

    w49 = game.add.sprite(2392,1690, '49');

    w49.scale.setTo(1, 1);

    game.physics.p2.enable(w49);

    w49.body.setCollisionGroup(wallCollisionGroup);
    w49.body.collides(playerCollisionGroup);

    w49.body.static = true;

    w50 = game.add.sprite(2271,1643, '50');

    w50.scale.setTo(1, 1);

    game.physics.p2.enable(w50);

    w50.body.setCollisionGroup(wallCollisionGroup);
    w50.body.collides(playerCollisionGroup);

    w50.body.static = true;

    w51 = game.add.sprite(2131,1663, '51');

    w51.scale.setTo(1, 1);

    game.physics.p2.enable(w51);

    w51.body.setCollisionGroup(wallCollisionGroup);
    w51.body.collides(playerCollisionGroup);

    w51.body.static = true;

    w52 = game.add.sprite(1988,1643, '52');

    w52.scale.setTo(1, 1);

    game.physics.p2.enable(w52);

    w52.body.setCollisionGroup(wallCollisionGroup);
    w52.body.collides(playerCollisionGroup);

    w52.body.static = true;

    w53 = game.add.sprite(1740,1662, '53');

    w53.scale.setTo(1, 1);

    game.physics.p2.enable(w53);

    w53.body.setCollisionGroup(wallCollisionGroup);
    w53.body.collides(playerCollisionGroup);

    w53.body.static = true;

    w54 = game.add.sprite(1492,1635, '54');

    w54.scale.setTo(1, 1);

    game.physics.p2.enable(w54);

    w54.body.setCollisionGroup(wallCollisionGroup);
    w54.body.collides(playerCollisionGroup);

    w54.body.static = true;

    w55 = game.add.sprite(1352,1658, '55');

    w55.scale.setTo(1, 1);

    game.physics.p2.enable(w55);

    w55.body.setCollisionGroup(wallCollisionGroup);
    w55.body.collides(playerCollisionGroup);

    w55.body.static = true;

    w56 = game.add.sprite(1212,1632, '56');

    w56.scale.setTo(1, 1);

    game.physics.p2.enable(w56);

    w56.body.setCollisionGroup(wallCollisionGroup);
    w56.body.collides(playerCollisionGroup);

    w56.body.static = true;

    w57 = game.add.sprite(1090,1692, '57');

    w57.scale.setTo(1, 1);

    game.physics.p2.enable(w57);

    w57.body.setCollisionGroup(wallCollisionGroup);
    w57.body.collides(playerCollisionGroup);

    w57.body.static = true;

    w58 = game.add.sprite(1060,1778, '58');

    w58.scale.setTo(1, 1);

    game.physics.p2.enable(w58);

    w58.body.setCollisionGroup(wallCollisionGroup);
    w58.body.collides(playerCollisionGroup);

    w58.body.static = true;

    w59 = game.add.sprite(1044,1870, '59');

    w59.scale.setTo(1, 1);

    game.physics.p2.enable(w59);

    w59.body.setCollisionGroup(wallCollisionGroup);
    w59.body.collides(playerCollisionGroup);

    w59.body.static = true;

    w60 = game.add.sprite(5720,2163, '60');

    w60.scale.setTo(0.68, 1);

    game.physics.p2.enable(w60);

    w60.body.setCollisionGroup(wallCollisionGroup);
    w60.body.collides(playerCollisionGroup);

    w60.body.static = true;

    w61 = game.add.sprite(7572,3839, '61');

    w61.scale.setTo(1, 1);

    game.physics.p2.enable(w61);

    w61.body.setCollisionGroup(wallCollisionGroup);
    w61.body.collides(playerCollisionGroup);

    w61.body.static = true;







>>>>>>> nikolaf

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

    render() {
        this.game.debug.spriteCoords(player, 32, 500);
    }
    
} // class ends here

export default main;