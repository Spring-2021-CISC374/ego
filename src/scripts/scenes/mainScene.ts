import PhaserLogo from '../objects/phaserLogo';
import FpsText from '../objects/fpsText';
import Player from '../objects/player';
import Card from '../objects/card'
// import BattleScene from './battleScene'
export default class MainScene extends Phaser.Scene {
    
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  fpsText;
  player;
  clickButton;
  dealText;
  endText;
  showDeck;
  healthText;
  healthBar;
  playerHeath;
  shuffleText
  enemy;
  enemyHealth;

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
    this.initializeDeck();
    
  

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

  // //Player Show health
  // this.playerHeath= this.add.text(200, 15 , `Player health: ${this.player.getHealth()}`, {
  //   color: '#000000',
  //   fontSize: '16px'
  // })

  //Enemy Player Show health
  this.enemyHealth= this.add.text(this.cameras.main.width - 800, 15 , `Enemy health: ${this.enemy.getHealth()}`, {
    color: '#000000',
    fontSize: '24px'
  })

  //Show Hand button
  // this.showDeck = this.add.text(50,50,'Show Deck', {
  //   color: '#000000',
  //   fontSize: '24px'
  // })
  //   .setInteractive()
  //   .on('pointerdown', () => this.displayDeck(this.player) );
  
  //Status indicator Text
  this.statusBox = this.add.text(100,200, `Status Box: `,  {
    color: '#000000',
    fontSize: '24px'
  });

  //Card Count indicator
  this.cardCount = this.add.text(this.cameras.main.width - 225, 15, `Cards in Player hand ${this.player.getDeck().getFilledSlots()}`, {
    color: '#000000',
    fontSize: '24px'
  }).setOrigin(1, 0)

  //Sams Addition
  this.healthText=this.add.text(900, 600, `Current Health: ${this.player.getHealth()}/${this.player.getMaxHealth()}`,{
    color: '#000000',
    fontSize: '24px'
  })
  //.setOrigin(1,0)

  this.shuffleText = this.add.text(100, 250, 'Shuffle Cards', {
    color: '#000000',
    fontSize: '24px',
  })
  .setInteractive()
  .on('pointerdown', ()=>this.player.playerDeck.shuffle())

  this.healthBar=this.makeBar(900, 650, 0xe74c3c);
  this.setValue(this.healthBar,this.player.getHealth()/this.player.getMaxHealth());

  this.healthBar=this.makeBar(900, 650, 0xe74c3c);
  this.setValue(this.healthBar,this.player.getHealth()/this.player.getMaxHealth());
  
  }
  // I shortened the card names just so they would fit for now until we get the 
  //actual cards and I will add descriptions to each card (in comments)
  initializeDeck(){
    //Little Helper Card that helps the player recover
    this.player.addToDeck(new Card("LH", "Health Recovery", 1, 3,1));
    //Pick Me Up Card: 
    this.player.addToDeck(new Card("PMU", "Health Recovery", 2, 5,1));
    //Super Smile: 
    this.player.addToDeck(new Card("SS", "Health Recovery", 3, 7,1));
    //Reflect: 
    this.player.addToDeck(new Card("Reflect", "Attack", 4, 7,1));
    //Recover:
    this.player.addToDeck(new Card("Recover", "Health Recovery", 2, 3,1));
    //Boom:
    this.player.addToDeck(new Card("Boom", "Attack", 3, 5,1));
    //Shield:
    this.player.addToDeck(new Card("Shield", "Defense", 2, 3,1));
    //Lightning Bolt: 
    this.player.addToDeck(new Card("LB", "Attack", 2, 3,1));
    //BloodLust:
    this.player.addToDeck(new Card("BL", "Attack", 4, 7,1));
    //Counting Sheep:
    this.player.addToDeck(new Card("CS", "Attack", 3, 5,1));
    //Power Boost: 
    this.player.addToDeck(new Card("PB", "Defense", 4,7,1));
    this.player.playerDeck.shuffle();
    this.enemy.addToDeck(new Card("Little Helper", "Health Recovery", 1, 3,1));
    this.enemy.addToDeck(new Card("Pick Me Up", "Health Recovery", 2, 5,1));
    this.enemy.addToDeck(new Card("Super Smile", "Health Recovery", 3, 7,1));
    this.enemy.addToDeck(new Card("Reflect", "Attack", 4, 7,1));
    this.enemy.addToDeck(new Card("Recover", "Health Recovery", 2, 3,1));
    this.enemy.addToDeck(new Card("Boom", "Attack", 3, 5,1));
    this.enemy.addToDeck(new Card("Shield", "Defense", 2, 3,1));
    this.enemy.addToDeck(new Card("Lightning Bolt", "Attack", 2, 3,1));
    this.enemy.addToDeck(new Card("Bloodlust", "Attack", 4, 7,1));
    this.enemy.addToDeck(new Card("Counting Sheep", "Attack", 3, 5,1));
    this.enemy.addToDeck(new Card("Power Boost", "Defense", 4,7,1));


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
    
    //console.log(player.isTurn());
  }

  //Show Players Deck
  displayDeck(player : Player): void{
    console.log(player.getDeck());
    let deck = player.getDeck().getDeck();
    
    deck.forEach((card,index) =>{
      this.add.text(this.cameras.main.width - 600, index * 50 + 300  , `Name: ${card.name} Damage: ${card.damage} Cost: ${card.cost}` , {
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
      player.addToHand(player.playerDeck.deck[0])
      console.log(player.playerDeck);
      console.log(player.playerHand);
      // this.endTurn(player);
      this.player.changeHealth(1);
    }
    else{
      this.player.changeHealth(-1);
    }
    this.showHand();
    
  }

  makeBar(x, y,color) {
    let bar = this.add.graphics();

    bar.fillStyle(color, 1);

    bar.fillRect(0, 0, 300, 25);
    
    bar.x = x;
    bar.y = y;

    return bar;
  }

  setValue(bar,percentage) {
    bar.scaleX = percentage;
  }
  
s

  showHand(){
    if(this.player.getHand()!=null){
      let c=0;
      for(let i of this.player.getHand().getDeck()){
        let card=this.add.graphics();
        card.lineStyle(5, 0x000000, 1.0);
        card.fillStyle(0xFFFFFF, 1.0);
        card.fillRect((c+1)*(this.cameras.main.width/(this.player.getHand().getSize()+2)), 600, 70, 100);
        card.strokeRect((c+1)*(this.cameras.main.width/(this.player.getHand().getSize()+2)), 600, 70, 100);
  
        let cardText=this.add.text((c+1)*(this.cameras.main.width/(this.player.getHand().getSize()+2))+5, 605,i.getName(),{
          color: '#000000',
          fontSize: '14px'
        });
        let cardHappiness=this.add.text((c+1)*(this.cameras.main.width/(this.player.getHand().getSize()+2))+55, 680,i.getHappiness(),{
          color: '#000000',
          fontSize: '18px'
        });
        let cardRank=this.add.text((c+1)*(this.cameras.main.width/(this.player.getHand().getSize()+2))+5, 680,i.getRank(),{
          color: '#000000',
          fontSize: '18px'
        });
        c++;
  
      }
    }
  }



  update() { 


    const speed = 10;
    /**Movement  */
    if(this.cursors.left.isDown){
      
    }else if (this.cursors.right.isDown){
      this
      this.scene.start('MainScene')
    }else if (this.cursors.up.isDown){
      console.log("Up");
    }else if (this.cursors.down.isDown){
      console.log("Down");
    }

    this.showHand();
    this.statusBox.setText(`${(this.player.isTurn()) ? "Player can Draw Card" : "Player cannot draw card"}`)
    this.setValue(this.healthBar,this.player.getHealth()/this.player.getMaxHealth());

    if(this.player.getHand().isFull()){
      this.dealText.removeInteractive();
      this.cardCount.setText(`Players hand it full - Count: ${this.player.getDeck().getFilledSlots()}`);
    }else {
      this.dealText.setInteractive();
      this.cardCount.setText(`Cards in Player hand ${this.player.getDeck().getFilledSlots()}`);
    }
    
    this.healthText.setText(`Current Health: ${this.player.getHealth()}/${this.player.getMaxHealth()}`);


  }


}
