var Asteroids = Asteroids || {};

Asteroids.GameState = {
  init: function(){
    this.BULLET_SPEED = 150;
  },
  create: function(){
    console.log(this);
    this.background = this.game.add.tileSprite(0, 0, 480, 320, 'space');
    this.background.autoScroll(-100, 0);

    //create the player
    this.player = this.add.sprite(this.game.world.centerX, this.game.world.height - 50, 'player');
    this.player.anchor.setTo(0.5);
    this.player.scale.setTo(0.75,0.75);
    this.game.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;
    this.game.camera.follow(this.player);

    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.fire = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    // this.background = this.game.add.tileSprite(0, 0, 480, 320, 'background');
    // this.background.autoScroll(-150, -20);
    this.initRocks();
    this.initBullets();
  },
  update: function(){
    this.game.physics.arcade.overlap(this.Bullets, this.rocks, this.explodeRocks, null, this);
    //console.log("game state update!");

    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;

    //updating the player
    if(this.cursors.up.isDown){
      this.player.body.velocity.y = -100;
    }
    if(this.cursors.down.isDown){
      this.player.body.velocity.y = 100;
    }
    if(this.cursors.left.isDown){
      this.player.body.velocity.x = -100;
    }
    if(this.cursors.right.isDown){
      this.player.body.velocity.x = 100;
    }
    if(this.fire.isDown){
        this.createBullet();
    }
  },

  initRocks: function(){
    //console.log('initRocks');
    this.rocks = this.add.group();
    this.rocks.enableBody = true;
    for(var i = 0; i < 10; i++){
      //console.log("rock created");
      var randomX = Math.floor((Math.random()* 400)+ 100);
      var randomY = Math.floor(Math.random()* 300);
      //console.log("ROCK: " + randomX + ":" + randomY);
      var rock = new Asteroids.Rock(this.game, randomX, randomY);
      this.rocks.add(rock);

      var randomX = Math.floor((Math.random()* 200) + 460);
      var randomSpeed = Math.floor(Math.random()*100);
      rock.body.velocity.x = -randomSpeed;
    }
  },

  initBullets: function(){
    this.bulletTime = 0;
    this.Bullets = this.add.group();
    this.Bullets.enableBody = true;
  },

  createBullet: function(){
    if (this.game.time.now > this.bulletTime){
      var bullet = this.Bullets.getFirstExists(false);
      if(!bullet){
        bullet = new Asteroids.Bullet(this.game, this.player.x + 40, this.player.y);
        this.Bullets.add(bullet);
      }else{
        bullet.reset(this.player.x + 40, this.player.y);
      }

      bullet.body.velocity.x = this.BULLET_SPEED;
      this.bulletTime = this.game.time.now + 250;
    }
  },

  explodeRocks: function(bullet, rock){
    bullet.kill();
    var emitter = this.game.add.emitter(rock.x, rock.y, 50);
    emitter.makeParticles('explosionParticle');
    emitter.minParticleSpeed.setTo(-50, -50);
    emitter.maxParticleSpeed.setTo(50, 50);
    emitter.gravity = 0;
    emitter.start(true, 500, null, 100);

    rock.body.x = 500;
    rock.body.y = Math.floor(Math.random()* 300);
  }

}
