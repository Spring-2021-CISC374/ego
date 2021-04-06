import PhaserLogo from '../objects/phaserLogo';
import FpsText from '../objects/fpsText';
import Player from '../objects/player';
export default class MainScene extends Phaser.Scene {
    
  fpsText;
  player;
  clickButton;

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    // new PhaserLogo(this, this.cameras.main.width / 2, 0)
    //this.fpsText = new FpsText(this)
    this.player = new Player(this,"bob");
    // display the Phaser.VERSION
    this.add
      .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
        color: '#000000',
        fontSize: '24px'
      })
      .setOrigin(1, 0)

    this.clickButton = this.add.text(100, 100, 'Click me!', {
      color: '#000000',
      fontSize: '24px'
    })
      .setInteractive()
      .on('pointerdown', () => this.buttonPressed(this.player) );
  }


  buttonPressed(player: Player){
    player.changeTurn();
    this.clickButton.setText(`Is Players Turn?: ${player.isTurn()}`);
    console.log(player.isTurn());
  }

  update() { 
    
    // this.player.update();
    // this.fpsText.update()
  }

  





}
