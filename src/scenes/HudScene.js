import { Scene } from 'phaser'

class HudScene extends Scene {
  constructor(config) {
    super(config)
  }

  create() {
    this.texts = {
      hp: this.add.text(
        10,
        this.scene.systems.canvas.height - 30,
        `HP: ${this.registry.get('lives')}`,
        {
          fontFamily: '"Press Start 2P, cursive"',
          fontSize: '1.5rem'
        }
      ),
      score: this.add.text(
        10,
        20,
        `Score: ${this.registry.get('points')}`,
        {
          fontFamily: '"Press Start 2P, cursive"',
          fontSize: '1.5rem'
        }
      )
    }

    const level = this.scene.get('StageScene')
    level.events.on('pointsChanged', this.updateScore, this)
    level.events.on('livesChanged', this.updateHp, this)
  }

  updateScore() {
    this.texts.score.setText(`Score: ${this.registry.get('points')}`)
  }

  updateHp() {
    this.texts.hp.setText(`HP: ${this.registry.get('lives')}`)
  }
}

export default HudScene