var Asteroids = Asteroids || {};

Asteroids.GameState = {
  init: function(){
    this.BULLET_SPEED = 150;
  },
  create: function(){
    console.log(this);
    this.background = this.game.add.tileSprite(0, 0, 480, 320, 'space');
    this.background.autoScroll(-100, 0);

    this.score = 0;

    //create the player
    this.player = this.add.sprite(this.game.world.centerX, this.game.world.height - 50, 'newPlayer');
    this.player.animations.add('fly', [0,1,2,3,4], 5, true);
    this.player.animations.play('fly');
    this.player.anchor.setTo(0.5);
    this.player.scale.setTo(1.75,1.75);
    this.player.health = 100;
    this.player.invincible = false;
    this.playerInvinciblityTime = 0;

    this.game.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;
    this.game.camera.follow(this.player);

    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.fire = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    // this.background = this.game.add.tileSprite(0, 0, 480, 320, 'background');
    // this.background.autoScroll(-150, -20);
    this.initRocks();
    this.initBullets();
    this.initAliens();
    this.initScoreAndHealth();
  },
  update: function(){
    //Bullet Collisions
    this.game.physics.arcade.overlap(this.Bullets, this.rocks, this.explodeRocks, null, this);
    this.game.physics.arcade.overlap(this.Bullets, this.Aliens, this.explodeAliens,null, this);

    //Player Collisions
    this.game.physics.arcade.overlap(this.player, this.rocks, this.damagePlayer, null, this);
    //console.log("game state update!");

    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;

    //player blinking if hit
    if(this.player.invincible){
      if(this.game.time.now % 2 == 0){
       this.player.tint = 0xff0000;
      }else{
        this.player.tint = 0xffffff;
      }
    }
    //turn of blinking after invincibity time passed
    if(this.game.time.now > this.playerInvinciblityTime){
      this.player.invincible = false;
      this.player.tint = 0xffffff;
    }

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

  initScoreAndHealth: function(){
    this.game.scoreBoard =  this.game.add.bitmapText(10, 10, "newFont", "SCORE: " + this.score , 24);
    this.game.healthboard = this.game.add.bitmapText(this.game.world.bounds.width - 160, 10, "newFont", "HEALTH: " + this.player.health +"%" , 24);
    this.game.scoreBoard.style.fill = 0xFF0000;
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

  initAliens: function(){
    this.Aliens = this.add.group();
    this.Aliens.enableBody = true;
    var alien = new Asteroids.Alien(this.game ,100, 100);
    this.Aliens.add(alien);
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

    //update players score
    this.score += 100;
    this.game.scoreBoard.setText("SCORE: " + this.score);
  },

  explodeAliens: function(bullet, alien){
    alien.reset(600,200);
    this.score += 300;
    this.game.scoreBoard.setText("SCORE: " + this.score);
  },

  damagePlayer: function(player, rock){
    if (this.game.time.now > this.playerInvinciblityTime){
      this.player.health -= 10;
      this.player.invincible = true;
      this.game.healthboard.setText("Health: " + this.player.health + "%");
      this.playerInvinciblityTime = this.game.time.now + 700;
    }

  }

}
