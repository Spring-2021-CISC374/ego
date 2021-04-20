import PhaserLogo from '../objects/phaserLogo';
import FpsText from '../objects/fpsText';
import Player from '../objects/player';
import Card from '../objects/card'

/**
 * Todo
 * 
 * Show cards in hand - Done
 * Create Enemy Object - Done
 * Have computer Draw cards - Done
 * Show computer health - Done
 * Show player health - Done
 * Have cards 
 *  deal damage
 *  Add health
 * 
 * Create psuedo random card generator - Done for now
 * 
 */



export default class BattleScene extends Phaser.Scene {
      
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  fpsText;
  player;
  clickButton;
  dealText;
  endText;
  showDeck;
  playerHeath;

  enemy;
  enemyHealth;

  message;
  statusBox;
  cardCount;

  playerSprite;
  
  constructor() {
    super({ key: 'BattleScene' })
  }

  init(){
    this.cursors = this.input.keyboard.createCursorKeys();
  }


  preload() {
    
    /**BATTLE SCENE INDICATOR */
    this.add
      .text(this.cameras.main.width - 15, 15, `Battle Scene`, {
        color: '#000000',
        fontSize: '24px'
      })
      .setOrigin(1, 0)
    
  }

  create() {

    this.player = new Player(this,"bob");// Player object
    this.enemy = new Player(this,"Computer");// Enemy player object
  

    this.playerSprite = this.add.sprite(this.cameras.main.width / 2,this.cameras.main.height / 2, 'player'); // Player Sprite

    this.dealText = this.add.text(100, 150, ['DRAW CARD'])
    .setFontSize(18)
    .setFontFamily('Trebuchet MS')
    .setColor('#000000')
    .setInteractive()
    .on('pointerdown', () => this.drawCard(this.player));


    
    //Interactive Text Box
  this.clickButton = this.add.text(100, 100, `Change turn`, {
    color: '#000000',
    fontSize: '24px'
  })
    .setInteractive()
    .on('pointerdown', () => this.endTurn(this.player) );

  //Player Show health
  this.playerHeath= this.add.text(200, 15 , `Player health: ${this.player.getHealth()}`, {
    color: '#000000',
    fontSize: '16px'
  })

  //Enemy Player Show health
  this.enemyHealth= this.add.text(0, 15 , `Enemy health: ${this.enemy.getHealth()}`, {
    color: '#000000',
    fontSize: '16px'
  })

  //Show Hand button
  this.showDeck = this.add.text(50,50,'Show Deck', {
    color: '#000000',
    fontSize: '24px'
  })
    .setInteractive()
    .on('pointerdown', () => this.displayDeck(this.player) );
  


  //Status indicator Text
  this.statusBox = this.add.text(100,200, `Status Box: `,  {
    color: '#000000',
    fontSize: '24px'
  });

  //Card Count indicator
  this.cardCount = this.add.text(this.cameras.main.width - 350, 15, `Cards in Player hand ${this.player.getDeck().getFilledSlots()}`, {
    color: '#000000',
    fontSize: '24px'
  }).setOrigin(1, 0)


  }


  

  endTurn(player: Player){
    player.changeTurn();
    if(player.isTurn()){
      this.clickButton.setText(`Change turn: It is ${player.getName()}'s turn `);  
    }else{
      this.clickButton.setText(`Change turn: It is the computer's turn`);
      this.drawCard(this.enemy);
      this.drawCard(this.enemy);
      this.drawCard(this.enemy);
      this.displayDeck(this.enemy);
    }
    console.log(player.isTurn());
  }

  //Show Players Deck
  displayDeck(player : Player): void{
    console.log(player.getDeck());
    let deck = player.getDeck().getDeck();
    let right = (player.isTurn()) ? 0  : 300 ;
    
    deck.forEach((card,index) =>{
      this.add.text(50 + right, index * 50 + 300  , `Name: ${card.name} Damage: ${card.damage} Cost: ${card.cost}` , {
        color: '#000000',
        fontSize: '24px'
      })
    });
  }

  
  cardSelected(card : Card){
    console.log(card);
  }

  // Draw a card and add to players hand
  drawCard(player: Player){
    if(player.isTurn()){
      let num = Math.floor(Math.random() * 2) + 1;
      if(num == 1){
        player.addCard( new Card("Attack", 2, 1) );    
      }else { 
        player.addCard(new Card("Defend", 3,4));
      }
    }
    
  }

  update() { 

    const speed = 10;
    /**Movement  */
    if(this.cursors.left.isDown){
      
    }else if (this.cursors.right.isDown){
      this
      this.scene.start('BattleScene')
    }else if (this.cursors.up.isDown){
      console.log("Up");
    }else if (this.cursors.down.isDown){
      console.log("Down");
    }


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
