import PhaserLogo from '../objects/phaserLogo';
import FpsText from '../objects/fpsText';
import Player from '../objects/player';
import Card from '../objects/card'
import BattleScene from './battleScene'
export default class MainScene extends Phaser.Scene {
    
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  fpsText;
  player;
  clickButton;
  dealText;

  message;
  statusBox;
  cardCount;

  playerSprite;


  constructor() {
    super({ key: 'MainScene' })
  }

  init(){
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  preload(){
    this.load.image('player','src/assets/img/Light Bandit/Idle/LightBandit_Idle_0.png');
  }

  create() {
    // new PhaserLogo(this, this.cameras.main.width / 2, 0)
    //this.fpsText = new FpsText(this)
    
    this.playerSprite = this.add.sprite(this.cameras.main.width / 2,this.cameras.main.height / 2, 'player');

    this.player = new Player(this,"bob");
    // display the Phaser.VERSION
    this.add
      .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
        color: '#000000',
        fontSize: '24px'
      })
      .setOrigin(1, 0)
    

  }

  

  update() { 

    const speed = 10;
    /**Movement  */
    if(this.cursors.left.isDown){
      
    }else if (this.cursors.right.isDown){
      this.scene.start('BattleScene')
    }else if (this.cursors.up.isDown){
      console.log("Up");
    }else if (this.cursors.down.isDown){
      console.log("Down");
    }
  }

  





}
