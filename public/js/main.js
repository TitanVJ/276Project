

// var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser', { preload: preload, create: create, update: update, render: render });
class main extends Phaser.State { 
    
    init(){
        this.player;
        this.sprite;
        this.cursors;
        this.wall;
        this.playerCollisionGroup;
        this.wallCollisionGroup;
        this.time;
        this.lastTime=new Date();        

        this.w;
        this.a;
        this.s;
        this.d;
    }

    preload() {
        this.game.load.image('profeball', 'images/encIndicator.png');

        this.game.load.image('background','../ig/map.png');
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
        this.game.add.tileSprite(0,0,1000,1000,'background');
        this.game.world.setBounds(0, 0, 10000, 5000);

        this.playerCollisionGroup = this.game.physics.p2.createCollisionGroup();
        this.wallCollisionGroup = this.game.physics.p2.createCollisionGroup();

        this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'player');

        this.game.physics.p2.enable(this.player);
        this.player.body.collideWorldBounds = true;

        this.player.body.setCollisionGroup(this.playerCollisionGroup);
        this.player.body.collides(this.wallCollisionGroup);

        
        this.w1 = this.game.add.sprite(722,2155, '1');
        
        this.game.physics.p2.enable(this.w1);

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

        this.game.physics.p2.enable(this.w3);

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

        this.w8 = this.game.add.sprite(4915,2980, '8');

        this.w8.scale.setTo(1.5, 1);

        this.game.physics.p2.enable(this.w8);

        this.w8.body.setCollisionGroup(this.wallCollisionGroup);
        this.w8.body.collides(this.playerCollisionGroup);

        this.w8.body.static = true;

        this.w9 = this.game.add.sprite(5148,3135, '9');

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

        this.game.physics.p2.enable(this.w13);

        this.w13.body.setCollisionGroup(this.wallCollisionGroup);
        this.w13.body.collides(this.playerCollisionGroup);

        this.w13.body.static = true;

        this.w14 = this.game.add.sprite(7403,3430, '14');

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

        this.w16 = this.game.add.sprite(7200,4100, '16');

        this.w16.scale.setTo(1, 1);

        this.game.physics.p2.enable(this.w16);

        this.w16.body.setCollisionGroup(this.wallCollisionGroup);
        this.w16.body.collides(this.playerCollisionGroup);

        this.w16.body.static = true;

        this.w17 = this.game.add.sprite(7433,4230, '17');

        this.w17.scale.setTo(1, 1);

        this.game.physics.p2.enable(this.w17);

        this.w17.body.setCollisionGroup(this.wallCollisionGroup);
        this.w17.body.collides(this.playerCollisionGroup);

        this.w17.body.static = true;

        this.w18 = this.game.add.sprite(7850,4210, '18');

        this.w18.scale.setTo(1, 1);

        this.game.physics.p2.enable(this.w18);

        this.w18.body.setCollisionGroup(this.wallCollisionGroup);
        this.w18.body.collides(this.playerCollisionGroup);

        this.w18.body.static = true;

        this.w19 = this.game.add.sprite(8078,4180, '19');

        this.w19.scale.setTo(1, 1);

        this.game.physics.p2.enable(this.w19);

        this.w19.body.setCollisionGroup(this.wallCollisionGroup);
        this.w19.body.collides(this.playerCollisionGroup);

        this.w19.body.static = true;

        this.w20 = this.game.add.sprite(8367,4173, '20');

        this.w20.scale.setTo(1, 1);

        this.game.physics.p2.enable(this.w20);

        this.w20.body.setCollisionGroup(this.wallCollisionGroup);
        this.w20.body.collides(this.playerCollisionGroup);
        
        this.w20.body.static = true;

        this.w21 = this.game.add.sprite(8628,4136, '21');

        this.w21.scale.setTo(1, 1);

        this.game.physics.p2.enable(this.w21);

        this.w21.body.setCollisionGroup(this.wallCollisionGroup);
        this.w21.body.collides(this.playerCollisionGroup);

        this.w21.body.static = true;

        this.w22 = this.game.add.sprite(8615,4080, '22');

        this.w22.scale.setTo(1, 1);

        this.game.physics.p2.enable(this.w22);

        this.w22.body.setCollisionGroup(this.wallCollisionGroup);
        this.w22.body.collides(this.playerCollisionGroup);

        this.w22.body.static = true;

        this.w23 = this.game.add.sprite(8595,4000, '23');

        this.w23.scale.setTo(1, 1);

        this.game.physics.p2.enable(this.w23);

        this.w23.body.setCollisionGroup(this.wallCollisionGroup);
        this.w23.body.collides(this.playerCollisionGroup);

        this.w23.body.static = true;

        this.w24 = this.game.add.sprite(8348,3945, '24');

        this.w24.scale.setTo(1, 1);

        this.game.physics.p2.enable(this.w24);

        this.w24.body.setCollisionGroup(this.wallCollisionGroup);
        this.w24.body.collides(this.playerCollisionGroup);

        this.w24.body.static = true;

        this.w25 = this.game.add.sprite(7955,3845, '25');

        this.w25.scale.setTo(1, 1);

        this.game.physics.p2.enable(this.w25);

        this.w25.body.setCollisionGroup(this.wallCollisionGroup);
        this.w25.body.collides(this.playerCollisionGroup);

        this.w25.body.static = true;

        this.w26 = this.game.add.sprite(8079,3583, '26');

        this.w26.scale.setTo(1, 1);

        this.game.physics.p2.enable(this.w26);

        this.w26.body.setCollisionGroup(this.wallCollisionGroup);
        this.w26.body.collides(this.playerCollisionGroup);

        this.w26.body.static = true;

        this.w27 = this.game.add.sprite(8060,3403, '27');

        this.w27.scale.setTo(1, 1);

        this.game.physics.p2.enable(this.w27);

        this.w27.body.setCollisionGroup(this.wallCollisionGroup);
        this.w27.body.collides(this.playerCollisionGroup);

        this.w27.body.static = true;

        this.w28 = this.game.add.sprite(8075,3240, '28');

        this.w28.scale.setTo(1, 1);

        this.game.physics.p2.enable(this.w28);
        
        this.w28.body.setCollisionGroup(this.wallCollisionGroup);
        this.w28.body.collides(this.playerCollisionGroup);

        this.w28.body.static = true;

        this.w29 = this.game.add.sprite(8053,3010, '29');

        this.w29.scale.setTo(1, 1);

        this.game.physics.p2.enable(this.w29);

        this.w29.body.setCollisionGroup(this.wallCollisionGroup);
        this.w29.body.collides(this.playerCollisionGroup);

        this.w29.body.static = true;

        this.w30 = this.game.add.sprite(7940,2893, '30');

        this.w30.scale.setTo(1, 1);

        this.game.physics.p2.enable(this.w30);

        this.w30.body.setCollisionGroup(this.wallCollisionGroup);
        this.w30.body.collides(this.playerCollisionGroup);

        this.w30.body.static = true;

        this.w31 = this.game.add.sprite(7758,2930, '31');

        this.w31.scale.setTo(1.01, 1.1);

        this.game.physics.p2.enable(this.w31);

        this.w31.body.setCollisionGroup(this.wallCollisionGroup);
        this.w31.body.collides(this.playerCollisionGroup);

        this.w31.body.static = true;
        
        this.w32 = this.game.add.sprite(7070,2200, '32');

        this.w32.scale.setTo(1, 1);

        this.game.physics.p2.enable(this.w32);

        this.w32.body.setCollisionGroup(this.wallCollisionGroup);
        this.w32.body.collides(this.playerCollisionGroup);

        this.w32.body.static = true;

        this.w33 = this.game.add.sprite(7465,1534, '33');

        this.w33.scale.setTo(0.95, 4);

        this.game.physics.p2.enable(this.w33);

        this.w33.body.setCollisionGroup(this.wallCollisionGroup);
        this.w33.body.collides(this.playerCollisionGroup);

        this.w33.body.static = true;

        this.w34 = this.game.add.sprite(8379,1480, '34');

        this.w34.scale.setTo(3, 1);

        this.game.physics.p2.enable(this.w34);

        this.w34.body.setCollisionGroup(this.wallCollisionGroup);
        this.w34.body.collides(this.playerCollisionGroup);

        this.w34.body.static = true;

        this.w35 = this.game.add.sprite(7582,1350, '35');

        this.w35.scale.setTo(1, 1);

        this.game.physics.p2.enable(this.w35);

        this.w35.body.setCollisionGroup(this.wallCollisionGroup);
        this.w35.body.collides(this.playerCollisionGroup);

        this.w35.body.static = true;

        this.w36 = this.game.add.sprite(6582,1253, '36');

        this.w36.scale.setTo(1, 1.5);

        this.game.physics.p2.enable(this.w36);

        this.w36.body.setCollisionGroup(this.wallCollisionGroup);
        this.w36.body.collides(this.playerCollisionGroup);

        this.w36.body.static = true;

        this.w37 = this.game.add.sprite(6320,1355, '37');

        this.w37.scale.setTo(1, 1);

        this.game.physics.p2.enable(this.w37);

        this.w37.body.setCollisionGroup(this.wallCollisionGroup);
        this.w37.body.collides(this.playerCollisionGroup);

        this.w37.body.static = true;

        this.w38 = this.game.add.sprite(6000,1400, '38');

        this.w38.scale.setTo(1, 1);

        this.game.physics.p2.enable(this.w38);

        this.w38.body.setCollisionGroup(this.wallCollisionGroup);
        this.w38.body.collides(this.playerCollisionGroup);

        this.w38.body.static = true;

        this.w39 = this.game.add.sprite(5600,1330, '39');

        this.w39.scale.setTo(1, 1);

        this.game.physics.p2.enable(this.w39);

        this.w39.body.setCollisionGroup(this.wallCollisionGroup);
        this.w39.body.collides(this.playerCollisionGroup);

        this.w39.body.static = true;

        this.w40 = this.game.add.sprite(5186,1210, '40');

        this.w40.scale.setTo(1, 1);

        this.game.physics.p2.enable(this.w40);

        this.w40.body.setCollisionGroup(this.wallCollisionGroup);
        this.w40.body.collides(this.playerCollisionGroup);

        this.w40.body.static = true;

        this.w41 = this.game.add.sprite(4778,1548, '41');

        this.w41.scale.setTo(1, 1);

        this.game.physics.p2.enable(this.w41);

        this.w41.body.setCollisionGroup(this.wallCollisionGroup);
        this.w41.body.collides(this.playerCollisionGroup);

        this.w41.body.static = true;

        this.w42 = this.game.add.sprite(4555,1919, '42');

        this.w42.scale.setTo(1, 1);

        this.game.physics.p2.enable(this.w42);

        this.w42.body.setCollisionGroup(this.wallCollisionGroup);
        this.w42.body.collides(this.playerCollisionGroup);

        this.w42.body.static = true;

        this.w43 = this.game.add.sprite(4472,1812, '43');

        this.w43.scale.setTo(3, 1);

        this.game.physics.p2.enable(this.w43);

        this.w43.body.setCollisionGroup(this.wallCollisionGroup);
        this.w43.body.collides(this.playerCollisionGroup);

        this.w43.body.static = true;

        this.w44 = this.game.add.sprite(3940,1640, '44');

        this.w44.scale.setTo(1, 1);

        this.game.physics.p2.enable(this.w44);

        this.w44.body.setCollisionGroup(this.wallCollisionGroup);
        this.w44.body.collides(this.playerCollisionGroup);

        this.w44.body.static = true;

        this.w45 = this.game.add.sprite(2940,1810, '45');

        this.w45.scale.setTo(1, 1);

        this.game.physics.p2.enable(this.w45);

        this.w45.body.setCollisionGroup(this.wallCollisionGroup);
        this.w45.body.collides(this.playerCollisionGroup);

        this.w45.body.static = true;

        this.w46 = this.game.add.sprite(2330,1949, '46');

        this.w46.scale.setTo(1, 1);

        this.game.physics.p2.enable(this.w46);

        this.w46.body.setCollisionGroup(this.wallCollisionGroup);
        this.w46.body.collides(this.playerCollisionGroup);

        this.w46.body.static = true;

        this.w47 = this.game.add.sprite(2434,1870, '47');

        this.w47.scale.setTo(1, 1);

        this.game.physics.p2.enable(this.w47);

        this.w47.body.setCollisionGroup(this.wallCollisionGroup);
        this.w47.body.collides(this.playerCollisionGroup);

        this.w47.body.static = true;

        this.w48 = this.game.add.sprite(2425,1775, '48');

        this.w48.scale.setTo(1, 1);

        this.game.physics.p2.enable(this.w48);

        this.w48.body.setCollisionGroup(this.wallCollisionGroup);
        this.w48.body.collides(this.playerCollisionGroup);

        this.w48.body.static = true;

        this.w49 = this.game.add.sprite(2392,1690, '49');

        this.w49.scale.setTo(1, 1);

        this.game.physics.p2.enable(this.w49);

        this.w49.body.setCollisionGroup(this.wallCollisionGroup);
        this.w49.body.collides(this.playerCollisionGroup);

        this.w49.body.static = true;

        this.w50 = this.game.add.sprite(2271,1643, '50');

        this.w50.scale.setTo(1, 1);

        this.game.physics.p2.enable(this.w50);

        this.w50.body.setCollisionGroup(this.wallCollisionGroup);
        this.w50.body.collides(this.playerCollisionGroup);

        this.w50.body.static = true;

        this.w51 = this.game.add.sprite(2131,1663, '51');

        this.w51.scale.setTo(1, 1);

        this.game.physics.p2.enable(this.w51);

        this.w51.body.setCollisionGroup(this.wallCollisionGroup);
        this.w51.body.collides(this.playerCollisionGroup);

        this.w51.body.static = true;

        this.w52 = this.game.add.sprite(1988,1643, '52');

        this.w52.scale.setTo(1, 1);

        this.game.physics.p2.enable(this.w52);

        this.w52.body.setCollisionGroup(this.wallCollisionGroup);
        this.w52.body.collides(this.playerCollisionGroup);

        this.w52.body.static = true;

        this.w53 = this.game.add.sprite(1740,1662, '53');

        this.w53.scale.setTo(1, 1);

        this.game.physics.p2.enable(this.w53);

        this.w53.body.setCollisionGroup(this.wallCollisionGroup);
        this.w53.body.collides(this.playerCollisionGroup);

        this.w53.body.static = true;

        this.w54 = this.game.add.sprite(1492,1635, '54');

        this.w54.scale.setTo(1, 1);

        this.game.physics.p2.enable(this.w54);

        this.w54.body.setCollisionGroup(this.wallCollisionGroup);
        this.w54.body.collides(this.playerCollisionGroup);

        this.w54.body.static = true;

        this.w55 = this.game.add.sprite(1352,1658, '55');

        this.w55.scale.setTo(1, 1);

        this.game.physics.p2.enable(this.w55);

        this.w55.body.setCollisionGroup(this.wallCollisionGroup);
        this.w55.body.collides(this.playerCollisionGroup);

        this.w55.body.static = true;

        this.w56 = this.game.add.sprite(1212,1632, '56');

        this.w56.scale.setTo(1, 1);

        this.game.physics.p2.enable(this.w56);

        this.w56.body.setCollisionGroup(this.wallCollisionGroup);
        this.w56.body.collides(this.playerCollisionGroup);

        this.w56.body.static = true;

        this.w57 = this.game.add.sprite(1090,1692, '57');

        this.w57.scale.setTo(1, 1);

        this.game.physics.p2.enable(this.w57);

        this.w57.body.setCollisionGroup(this.wallCollisionGroup);
        this.w57.body.collides(this.playerCollisionGroup);

        this.w57.body.static = true;

        this.w58 = this.game.add.sprite(1060,1778, '58');

        this.w58.scale.setTo(1, 1);

        this.game.physics.p2.enable(this.w58);

        this.w58.body.setCollisionGroup(this.wallCollisionGroup);
        this.w58.body.collides(this.playerCollisionGroup);

        this.w58.body.static = true;

        this.w59 = this.game.add.sprite(1044,1870, '59');

        this.w59.scale.setTo(1, 1);

        this.game.physics.p2.enable(this.w59);

        this.w59.body.setCollisionGroup(this.wallCollisionGroup);
        this.w59.body.collides(this.playerCollisionGroup);

        this.w59.body.static = true;

        this.w60 = this.game.add.sprite(5720,2163, '60');

        this.w60.scale.setTo(0.68, 1);

        this.game.physics.p2.enable(this.w60);

        this.w60.body.setCollisionGroup(this.wallCollisionGroup);
        this.w60.body.collides(this.playerCollisionGroup);

        this.w60.body.static = true;

        this.w61 = this.game.add.sprite(7572,3839, '61');

        this.w61.scale.setTo(1, 1);

        this.game.physics.p2.enable(this.w61);

        this.w61.body.setCollisionGroup(this.wallCollisionGroup);
        this.w61.body.collides(this.playerCollisionGroup);

        this.w61.body.static = true;








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
        time=new Date();
        if (time-lastTime>5000){
            $.ajax({
                method:'get',
                url:'/updateLocation',
                data:{ "x" : player.x, "y" : player.y },
                success: function() {
                    alert("Office hours has been added!");
                },
                error: ()=>{alert('Failed to add.')}
            });
            lastTime = new Date();
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
        this.game.debug.spriteCoords(this.player, 32, 500);
    }
    
} // class ends here

export default main;