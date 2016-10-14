/*global Phaser*/
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
});
var platforms;
var player;
var cursors;
var stars;
var scoreText;
var score=0;


function preload() {
    game.load.image('sky', 'assets/sky.png');
    game.load.image('star', 'assets/star.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, 'sky');
    scoreText=game.add.text(16,16,'score:0',{fontSize:'32px',fill: '#000'});
    platforms = game.add.group();
    platforms.enableBody = true;
    var ground = platforms.create(0, game.world.height-10, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;
    var ledge = platforms.create(275, 300, 'ground');
    ledge=platforms.create(0,100,'ground');
    ledge.body.immovable=true;
    player = game.add.sprite(32, game.world.height - 70, 'dude');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0;
    player.body.gravity.y = 200;
    player.body.collideWorldBounds = true;
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8, ], 10, true);
    cursors = game.input.keyboard.createCursorKeys();
    stars=game.add.group();
    stars.enableBody=true;
    for (var i=0; i<13; i++)
    {
        var star=stars.create(70,10,'star');
        star.body.gravity.y=6;
        stars.body.bounce.y=0.7+Math.random()*0.2;
        
    }
    platforms.body.gravity.x=200;
}

function update() {
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    game.physics.arcade.overlap(player,stars,collectStar,null,this);
    game.physics.arcade.collide(stars,platforms);
    game.physics.arcade.collide(platforms,platforms);
    if (cursors.left.isDown && player.body.touching.down && hitPlatform)
    {
        player.body.velocity.x=-150;
      player.animations.play('left');
    }
    else if (cursors.right.isDown && player.body.touching.down && hitPlatform)
    {
        player.body.velocity.x=150;
        player.animations.play('right');
        
    }
    else{

        if (player.body.touching.down && hitPlatform)
        {
        player.frame = 4;
        player.body.velocity.x=0;
        }
    }
    if (cursors.up.isDown && player.body.touching.down && hitPlatform)
    {
        player.body.velocity.y=-350;
    }
    if (player.body.velocity.x>0)
    {
        player.animations.play('right');
        
        
    }
    else if (player.body.velocity.x<0) {
        player.animations.play('left');
        
        
    }
    else{
        player.frame=4;
    }
}
function collectStar (player,star){
    star.kill();
    score+=1;
    scoreText.text='Score:'+score;
}