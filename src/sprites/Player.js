import { GameObjects } from 'phaser'
import Bullet from './Bullet.js'

const playerBulletSpeed = 300

/**
 * @property {Phaser.Physics.Arcade.Body} body
 */
class Player extends GameObjects.Sprite {
  /**
   * 
   * @param {Phaser.Scene} scene 
   */
  constructor(scene) {
    super(scene, 400, scene.sys.canvas.height - 32, 'ship')

    this.setDepth(5) // z-позиция игрока

    this.initVars()
    this.initPhysics()
    this.initControls()
    scene.add.existing(this) // Добавление игрока на сцену
  }

  // Инициализация переменных
  initVars() {
    this.speed = 2 // Скорость передвижения
    this.fireRate = 800 // Скорость выстрелов
    this.nextFireTime = 0 // Счётчик для задержки выстрелов

    this.bullets = this.scene.add.group({
      runChildUpdate: true
    })
  }

  // Инициализация клавишей управления
  initControls() {
    this.controls = this.scene.input.keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      fire: Phaser.Input.Keyboard.KeyCodes.SPACE
    })
  }

  // Включение физики для игрока
  initPhysics() {
    this.scene.physics.world.enable(this)
    this.body.setSize(48, 38)
    this.body.setOffset(6, 12)
  }

  fire() {
    if (this.nextFireTime < this.scene.time.now && this.controls.fire.isDown) {
      this.bullets.add(new Bullet(this.scene, this.x - 16, this.y, playerBulletSpeed))
      this.bullets.add(new Bullet(this.scene, this.x + 16, this.y, playerBulletSpeed))
      this.nextFireTime = this.scene.time.now + this.fireRate
    }
  }

  move() {
    if (this.controls.left.isDown && this.x > 32) {
      this.x -= this.speed
    } else if (this.controls.right.isDown && this.x < this.scene.sys.canvas.width - 32) {
      this.x += this.speed
    }
  }

  update() {
    this.move()
    this.fire()
  }

  gotDamage() {
    let lives = this.scene.registry.get('lives')
    this.scene.registry.set('lives', lives - 1)
    this.scene.events.emit('livesChanged')
  }
}

export default Player