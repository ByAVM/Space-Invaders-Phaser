import { GameObjects } from 'phaser'
import Bullet from './Bullet.js'

class EnemyBullet extends GameObjects.Sprite {
  constructor(scene, x, y, speed) {
    super(scene, x, y, 'red_bullet')
    this.speed = speed
    this.setDepth(1)

    this.initPhysics()
    scene.add.existing(this)
  }

  initPhysics() {
    this.scene.physics.world.enable(this)
    this.body.setVelocityY(-this.speed)
    
    this.scene.physics.moveTo(this, this.scene.player.x, this.scene.player.y, this.speed, 3000)

    this.rotation = Phaser.Math.Angle.BetweenPoints(this, this.scene.player) + 1.57

    this.body.setSize(8, 30)
    this.body.setOffset(1, 1)
  }

  update() {
    if (this.y < -16) {
      this.destroy()
    }
  }
}

export default EnemyBullet