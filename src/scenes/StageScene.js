import { Scene } from 'phaser'
import Player from '../sprites/Player.js'
import Enemy from '../sprites/Enemy.js'

class StageScene extends Scene {
  constructor(config) {
    super(config)
  }

  create() {
    this.background = this.add.tileSprite(0, 0, this.sys.canvas.width, this.sys.canvas.height, 'space_1')
    this.background.setOrigin(0, 0)

    this.player = new Player(this)

    this.enemies = this.add.group({runChildUpdate: true})

    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 10; x++) {
        this.enemies.add(new Enemy(this, x * 70 + 90, y * 60 + 50, 3))
      }
    }
  }

  update() {
    this.background.tilePositionY -= 1

    if (this.player.active) {
      this.player.update()

      this.enemies.children.each(enemy => {
        if (enemy.bullets.getLength() > 0) {
          this.physics.overlap(
            enemy.bullets,
            this.player,
            this.hitPlayer,
            null,
            this
          )
        }
      }, this)

      this.checkCollisions()
    }

    if (this.registry.get('lives') < 0 || this.enemies.getLength() === 0) {
      this.scene.start('MenuScene')
      this.scene.stop('HudScene')
    }
  }

  checkCollisions() {
    this.physics.overlap(
      this.player.bullets,
      this.enemies,
      this.hitEnemy,
      null,
      this
    )
  }

  hitEnemy(bullet, enemy) {
    bullet.destroy()
    enemy.gotDamage()
  }

  hitPlayer(bullet, enemy) {
    bullet.destroy()
    enemy.gotDamage()
  }
}

export default StageScene