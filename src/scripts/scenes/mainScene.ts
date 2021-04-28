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
  shuffleText;
  healthText;
  healthBar;

  message;
  statusBox;
  cardCount;
  hand;

  playerSprite;


  constructor() {
    super({ key: 'MainScene' })
  }

  init(){
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  preload(){
    this.load.image('player','src/assets/img/Light Bandit/Idle/LightBandit_Idle_0.png');
    this.load.image('attackCardBase', 'src/assets/img/CardBases/attackcard.png');
    this.load.image('healCardBase', 'src/assets/img/CardBases/healcard.png');
    this.load.image('buffCardBase', 'src/assets/img/CardBases/buffcard.png');

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

    // this.healthText=this.add.text(100, 15, `Current Health: ${this.player.getHealth()}/${this.player.getMaxHealth()}`,{
    //   color: '#000000',
    //   fontSize: '24px'
    // })
    // //.setOrigin(1,0)
    

    // this.shuffleText = this.add.text(100, 250, 'Shuffle Cards', {
    //   color: '#000000',
    //   fontSize: '24px',
    // })
    // .setInteractive()
    // .on('pointerdown', ()=>this.player.playerDeck.shuffle())

    // this.healthBar=this.makeBar(100, 50, 0xe74c3c);
    // this.setValue(this.healthBar,this.player.getHealth()/this.player.getMaxHealth());
  }

  

//   buttonPressed(player: Player){
//     player.changeTurn();
//     if(player.isTurn()){
//       this.clickButton.setText(`Change turn: It is ${player.getName()}'s turn `);  
//     }else{
//       this.clickButton.setText(`Change turn: It is the computer's turn`);
//     }
    
//     console.log(player.isTurn());
//   }


//   drawCard(player: Player){
//     if(player.isTurn()){
//       var randCard=Math.random()*3;
//       if(randCard<1){
//         player.addCard( new Card("Buff", 2, 4) ); 
//       }
//       else if(randCard<2){
//         player.addCard( new Card("Heal", 2, 4) ); 
//       }
//       else{
//         player.addCard( new Card("Attack", 2, 4) ); 
//       } 
//       this.buttonPressed(player);
//       this.player.changeHealth(1);
//     }
//     else{
//       this.player.changeHealth(-1);
//     }


    
//   }

//   makeBar(x, y,color) {
//     let bar = this.add.graphics();

//     bar.fillStyle(color, 1);

//     bar.fillRect(0, 0, 300, 25);
    
//     bar.x = x;
//     bar.y = y;

//     return bar;
// }

// setValue(bar,percentage) {
//   bar.scaleX = percentage;
// }

// showHand(){
//   if(this.player.getDeck()!=null){
//     let c=0;
//     for(let i of this.player.getDeck().getDeck()){
//       let card=this.add.graphics();
//       card.lineStyle(5, 0x000000, 1.0);
//       card.fillStyle(0xFFFFFF, 1.0);
//       card.fillRect((c+1)*(this.cameras.main.width/(this.player.getDeck().getSize()+2)), 300, 70, 100);
//       card.strokeRect((c+1)*(this.cameras.main.width/(this.player.getDeck().getSize()+2)), 300, 70, 100);

//       let cardText=this.add.text((c+1)*(this.cameras.main.width/(this.player.getDeck().getSize()+2))+5, 305,i.getName(),{
//         color: '#000000',
//         fontSize: '18px'
//       });
//       let cardDamage=this.add.text((c+1)*(this.cameras.main.width/(this.player.getDeck().getSize()+2))+55, 380,i.getDamage(),{
//         color: '#000000',
//         fontSize: '18px'
//       });
//       let cardCost=this.add.text((c+1)*(this.cameras.main.width/(this.player.getDeck().getSize()+2))+5, 380,i.getCost(),{
//         color: '#000000',
//         fontSize: '18px'
//       });
//       c++;

//     }
//   }
// }

  update() { 
    // this.statusBox.setText(`${(this.player.isTurn()) ? "Player can Draw Card" : "Player cannot draw card"}`)
    // this.setValue(this.healthBar,this.player.getHealth()/this.player.getMaxHealth());
    
    // this.showHand();

    if (this.cursors.right.isDown){
      this.scene.start('BattleScene');
    }


    // if(this.player.getDeck().isFull()){
    //   this.dealText.removeInteractive();
    //   this.cardCount.setText(`Players hand is full - Count: ${this.player.getDeck().getFilledSlots()}`);
    // }else {
    //   this.dealText.setInteractive();
    //   this.cardCount.setText(`Cards in Player hand ${this.player.getDeck().getFilledSlots()}`);
    // }

    // this.healthText.setText(`Current Health: ${this.player.getHealth()}/${this.player.getMaxHealth()}`);
    
  }

  





}
