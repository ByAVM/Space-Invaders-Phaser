import { GameObjects } from 'phaser'

class Bullet extends GameObjects.Sprite {
  constructor(scene, x, y, speed) {
    super(scene, x, y, 'green_bullet')
    this.speed = speed
    this.setDepth(1)

    this.initPhysics()
    scene.add.existing(this)
  }

  initPhysics() {
    this.scene.physics.world.enable(this)
    this.body.setVelocityY(-this.speed)
    this.body.setSize(8, 30)
    this.body.setOffset(1, 1)
  }

  update() {
    if (this.y < -16) {
      this.destroy()
    }
  }
}

export default Bullet