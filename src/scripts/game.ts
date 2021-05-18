import 'phaser'
import MainScene from './scenes/mainScene'
import PreloadScene from './scenes/preloadScene'
import WorldScene from './scenes/worldScene'
import TutScene from './scenes/tutScene'
import IntroScene from './scenes/introScene'
//import HouseScene from './scenes/houseScene'
// import BattleScene from './scenes/battleScene';

const DEFAULT_WIDTH = 1280
const DEFAULT_HEIGHT = 720

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#ffffff',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
  scene: [PreloadScene,MainScene,IntroScene, WorldScene,TutScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  }
}

window.addEventListener('load', () => {
  const game = new Phaser.Game(config)
})
