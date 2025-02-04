const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 300 },
        debug: false
      }
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };
  
  const game = new Phaser.Game(config);
  
  let player;
  let cursors;
  let platforms;
  
  function preload() {
    this.load.image('sky', 'https://examples.phaser.io/assets/skies/space3.png');
    this.load.image('ground', 'https://examples.phaser.io/assets/sprites/platform.png');
    this.load.image('player', 'https://examples.phaser.io/assets/sprites/phaser-dude.png');
  }
  
  function create() {
    this.add.image(400, 300, 'sky');
  
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
  
    player = this.physics.add.sprite(100, 450, 'player');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
  
    this.physics.add.collider(player, platforms);
  
    cursors = this.input.keyboard.createCursorKeys();
  }
  
  function update() {
    if (cursors.left.isDown) {
      player.setVelocityX(-160);
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);
    } else {
      player.setVelocityX(0);
    }
  
    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-330);
    }
  }
  