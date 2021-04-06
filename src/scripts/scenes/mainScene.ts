import PhaserLogo from '../objects/phaserLogo';
import FpsText from '../objects/fpsText';
import Player from '../objects/player';
import Card from '../objects/card'
export default class MainScene extends Phaser.Scene {
    
  fpsText;
  player;
  clickButton;
  dealText;

  message;
  statusBox;
  cardCount;

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
    
    this.dealText = this.add.text(100, 150, ['DRAW CARD'])
      .setFontSize(18)
      .setFontFamily('Trebuchet MS')
      .setColor('#000000')
      .setInteractive()
      .on('pointerdown', () => this.drawCard(this.player));

    this.clickButton = this.add.text(100, 100, `Change turn`, {
      color: '#000000',
      fontSize: '24px'
    })
      .setInteractive()
      .on('pointerdown', () => this.buttonPressed(this.player) );


    this.statusBox = this.add.text(100,200, `Status Box: `,  {
      color: '#000000',
      fontSize: '24px'
    });

    this.cardCount = this.add
    .text(this.cameras.main.width - 350, 15, `Cards in Player hand ${this.player.getDeck().getFilledSlots()}`, {
      color: '#000000',
      fontSize: '24px'
    })
    .setOrigin(1, 0)

  }

  

  buttonPressed(player: Player){
    player.changeTurn();
    if(player.isTurn()){
      this.clickButton.setText(`Change turn: It is ${player.getName()}'s turn `);  
    }else{
      this.clickButton.setText(`Change turn: It is the computer's turn`);
    }
    
    console.log(player.isTurn());
  }


  drawCard(player: Player){
    if(player.isTurn()){
      player.addCard( new Card("Attack", 2, 4) );  
      this.buttonPressed(player);
    }
    
  }

  update() { 
    this.statusBox.setText(`${(this.player.isTurn()) ? "Player can Draw Card" : "Player cannot draw card"}`)

    


    if(this.player.getDeck().isFull()){
      this.dealText.removeInteractive();
      this.cardCount.setText(`Players hand it full - Count: ${this.player.getDeck().getFilledSlots()}`);
    }else {
      this.dealText.setInteractive();
      this.cardCount.setText(`Cards in Player hand ${this.player.getDeck().getFilledSlots()}`);
    }
    
  }

  





}
