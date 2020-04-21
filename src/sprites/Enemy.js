import { GameObjects } from 'phaser'
import EnemyBullet from './EnemyBullet.js'

const enemyBulletSpeed = 300

class Enemy extends GameObjects.Sprite {
  constructor(scene, x, y, lives) {
    super(scene, x, y, 'enemy_ship')
    this.setDepth(5) // z-позиция врагов

    this.lives = lives
    this.enemyTint = 0xffffff
    this.isHurt = false
    this.hurtTime = 20
    this.killPoints = 20

    this.initVars()
    this.initPhysics()
    scene.add.existing(this)
  }

  initVars() {
    this.bullets = this.scene.add.group({
      maxSize: 10,
      runChildUpdate: true
    })

    this.reloadTime = 2000
  }

  initPhysics() {
    this.scene.physics.world.enable(this)
    this.body.setSize(52, 50)
    this.body.setOffset(6, 8)
  }

  update() {
    if (this.active) {
      if (Phaser.Math.RND.between(0, this.reloadTime) === 0) {
        this.bullets.add(
          new EnemyBullet(
            this.scene,
            this.x,
            this.y,
            enemyBulletSpeed
          )
        )
      }

      if (this.isHurt) {
        this.setTint(0xfa3434)
        if (this.hurtTime > 0) {
          this.hurtTime -= 1
        } else {
          this.setTint(this.enemyTint)
          this.isHurt = false
          this.hurtTime = 20
        }
      }
    }
  }

  gotDamage() {
    this.lives -= 1;
    if (this.lives === 0) {
      this.setActive(false)
      this.increasePoints()
      this.destroy()
    } else {
      this.isHurt = true
    }
  }

  increasePoints() {
    const currentPoints = this.scene.registry.get('points')
    this.scene.registry.set('points', currentPoints + this.killPoints)
    this.scene.events.emit('pointsChanged')
  }
}

export default Enemy