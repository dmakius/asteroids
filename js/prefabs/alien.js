var Asteroids = Asteroids || {};

Asteroids.Alien = function(game, x, y){
  Phaser.Sprite.call(this, game, x, y, 'newBadGuy');
  this.anchor.setTo(0.5);
  this.scale.setTo(0.75);
  this.animations.add('fly', [0,1,2,3,4,5,6,7], 15, true);
  this.animations.play('fly');
  this.checkWorldBounds = true;
  this.outOfBoundsKill = false;
  this.randomY = 10;
}

Asteroids.Alien.prototype = Object.create(Phaser.Sprite.prototype);
Asteroids.Alien.prototype.constructor = Asteroids.Alien;

Asteroids.Alien.prototype.update = function(){
  console.log(this.randomY);
  this.body.velocity.y = 12;
  this.body.velocity.x = -150;
  if(this.body.x <= -20){
    this.body.x = 600;
    this.body.y = 100;
  }
}
