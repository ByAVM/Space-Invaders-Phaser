import SpaceShip from './assets/sprites/spaceship.png'
import GreenBullet from './assets/sprites/laserBullet.png'
import RedBullet from './assets/sprites/laserBullet_red.png'
import BG1 from './assets/backgrounds/space_1.png'
import EnemyShip from './assets/sprites/enemyShip.png'

/**
 * Функция для загрузки всех ресурсов
 * @param {globalThis.Phaser.Scene} scene
 */
export default (scene) => {
  scene.load.image('ship', SpaceShip)
  scene.load.image('enemy_ship', EnemyShip)
  scene.load.image('space_1', BG1)
  scene.load.image('green_bullet', GreenBullet)
  scene.load.image('red_bullet', RedBullet)
}