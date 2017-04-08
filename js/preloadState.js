var Asteroids = Asteroids || {};
Asteroids.PreloadState = {
  init: function(){
    console.log("init preloadtState");
  },

  preload: function(){
    console.log("preload preloadtState");
    this.game.stage.backgroundColor = '#5e3f6b';
    this.preloadBar = this.game.add.sprite(this.game.width/2, this.game.height/2, 'preloader');
		this.preloadBar.anchor.setTo(0.5, 0.5);
    this.load.setPreloadSprite(this.preloadBar);
    //this.load.onLoadComplete.addOnce(this.onLoadComplete, this);

    var scoreFont = "24px Arial";

    //load audio files
    this.loading = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 50, " LOADING......", {font: scoreFont, fill: "#fff"});
		this.loading.anchor.setTo(0.5, 0.5);
    this.game.load.audio('die',"https://s3-us-west-2.amazonaws.com/makoverwebsite/GameMusic/die.mp3");
    this.game.load.audio('explosion',"https://s3-us-west-2.amazonaws.com/makoverwebsite/GameMusic/explosion.mp3");
    this.game.load.audio('beam',"https://s3-us-west-2.amazonaws.com/makoverwebsite/GameMusic/beam.mp3");
    this.game.load.audio('intro',"https://s3-us-west-2.amazonaws.com/makoverwebsite/GameMusic/intro.mp3");
    this.game.load.audio('main',"https://s3-us-west-2.amazonaws.com/makoverwebsite/GameMusic/main.mp3");
    this.game.load.audio('enemyHit',"https://s3-us-west-2.amazonaws.com/makoverwebsite/GameMusic/enemyHit.mp3");
    this.game.load.audio('health',"https://s3-us-west-2.amazonaws.com/makoverwebsite/GameMusic/health.mp3");
    this.game.load.audio('playerHurt',"https://s3-us-west-2.amazonaws.com/makoverwebsite/GameMusic/playerHurt.mp3");

    //load image files
    this.game.load.image('player', 'assets/ship.jpg');
    this.game.load.image('space', 'assets/space.jpg');
    this.game.load.image('bullet', 'assets/bullet.jpg');
    this.game.load.image('rock', 'assets/rock.jpg');
    this.game.load.image('healthUp', 'assets/healthUp.jpg');
    this.game.load.image('explosion', 'assets/explosion.jpg');
    this.game.load.image('badguy', 'assets/bad_guy.jpg');
    this.game.load.spritesheet('newBadGuy', 'assets/brainy_idle.jpg', 100, 42, 8);

    //font
    this.game.load.bitmapFont('newFont', 'assets/fonts/font.png', 'assets/fonts/font.fnt');

  },

  create: function(){
    this.preloadBar.cropEnabled = false;
    console.log("create preloadState");
    this.game.state.start('GameState');
  }
}
