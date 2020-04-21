import Phaser from "phaser";
import MainScene from './scenes/MainScene.js'
import StageScene from './scenes/StageScene.js'
import HudScene from './scenes/HudScene.js'
import MenuScene from './scenes/MenuScene.js'

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  scene: null,
  physics: {
    default: 'arcade',
    arcade: {
      // debug: true,
      // debugShowBody: true
    }
  }
};

const game = new Phaser.Game(config);
game.scene.add('MainScene', MainScene, true) // Начнется сразу
game.scene.add('StageScene', StageScene)
game.scene.add('HudScene', HudScene)
game.scene.add('MenuScene', MenuScene)
