import Phaser from 'phaser'
import loadResources from '../resources.js'

// Начальная сцена. Главное меню
class MainScene extends Phaser.Scene {
  constructor(config) {
    super(config)
  }

  preload() {
    loadResources(this)
  }

  create() {
    this.background = this.add.image(0, 0, 'space_1')
    this.background.setOrigin(0, 0)

    this.text = this.add.text(300, 250, "Loading..", {fillColor: "#fff"})
  }

  update() {
    this.scene.start('MenuScene')
  }
}

export default MainScene