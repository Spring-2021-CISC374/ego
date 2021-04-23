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
  this.healthText=this.add.text(100, 15, `Current Health: ${this.player.getHealth()}/${this.player.getMaxHealth()}`,{
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

  this.healthBar=this.makeBar(100, 50, 0xe74c3c);
  this.setValue(this.healthBar,this.player.getHealth()/this.player.getMaxHealth());





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
      var randCard=Math.random()*3;
      if(randCard<1){
        player.addCard( new Card("Buff", 2, 4) ); 
      }
      else if(randCard<2){
        player.addCard( new Card("Heal", 2, 4) ); 
      }
      else{
        player.addCard( new Card("Attack", 2, 4) ); 
      } 
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

  showHand(){
    if(this.player.getDeck()!=null){
      let c=0;
      for(let i of this.player.getDeck().getDeck()){
        let card=this.add.graphics();
        card.lineStyle(5, 0x000000, 1.0);
        card.fillStyle(0xFFFFFF, 1.0);
        card.fillRect((c+1)*(this.cameras.main.width/(this.player.getDeck().getSize()+2)), 300, 70, 100);
        card.strokeRect((c+1)*(this.cameras.main.width/(this.player.getDeck().getSize()+2)), 300, 70, 100);
  
        let cardText=this.add.text((c+1)*(this.cameras.main.width/(this.player.getDeck().getSize()+2))+5, 305,i.getName(),{
          color: '#000000',
          fontSize: '18px'
        });
        let cardDamage=this.add.text((c+1)*(this.cameras.main.width/(this.player.getDeck().getSize()+2))+55, 380,i.getDamage(),{
          color: '#000000',
          fontSize: '18px'
        });
        let cardCost=this.add.text((c+1)*(this.cameras.main.width/(this.player.getDeck().getSize()+2))+5, 380,i.getCost(),{
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


    this.statusBox.setText(`${(this.player.isTurn()) ? "Player can Draw Card" : "Player cannot draw card"}`)
    this.setValue(this.healthBar,this.player.getHealth()/this.player.getMaxHealth());

    this.showHand();
  
    if(this.player.getDeck().isFull()){
      this.dealText.removeInteractive();
      this.cardCount.setText(`Players hand it full - Count: ${this.player.getDeck().getFilledSlots()}`);
    }else {
      this.dealText.setInteractive();
      this.cardCount.setText(`Cards in Player hand ${this.player.getDeck().getFilledSlots()}`);
    }
    
    this.healthText.setText(`Current Health: ${this.player.getHealth()}/${this.player.getMaxHealth()}`);


  }


}
