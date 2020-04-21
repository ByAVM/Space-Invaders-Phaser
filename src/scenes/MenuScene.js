import Phaser from 'phaser'
import Button from '../gameObjects/Button.js'

// Начальная сцена. Главное меню
class MenuScene extends Phaser.Scene {
  constructor(config) {
    super(config)
  }

  create() {
    this.background = this.add.image(0, 0, 'space_1')
    this.background.setOrigin(0, 0)

    this.text = this.add.text(220, 150, "Space Invaders", {fillColor: "#fff", fontSize: "2.5rem"})

    this.startButton = new Button(this, 350, 400, 'Start', () => {
      this.scene.start('HudScene')
      this.scene.start('StageScene')
      this.scene.bringToTop('HudScene')
    })

    this.initRegistry()
  }

  initRegistry() {
    this.registry.set('points', 0)
    this.registry.set('lives', 3)
    this.registry.set('level', 1)
  }
}

export default MenuScene