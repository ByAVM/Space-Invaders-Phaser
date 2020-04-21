import { GameObjects } from 'phaser'

class Button extends GameObjects.Text {
  /**
   * 
   * @param {Phaser.Scene} scene 
   * @param {Number} x 
   * @param {Number} y 
   * @param {String} text 
   */
  constructor(scene, x, y, text, callback) {
    super(scene, x, y, text)

    this.setInteractive({useHandCursor: true})
      .on('pointerdown', callback)

    scene.add.existing(this)
  }
}

export default Button