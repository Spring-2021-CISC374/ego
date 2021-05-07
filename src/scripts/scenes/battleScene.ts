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
  healthText;
  healthBar;
  playerHeath;
  shuffleText
  enemy;
  enemyHealth;
  enemyHealthbar;
  energyBar;
  energyText;

  

  playerDrawDeck;
  enemyDrawDeck;

  message;
  statusBox;
  cardCount;

  playerSprite;
  background;
  
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


      this.load.image('background', 'src/assets/img/background.png');
      
      let cardLoadIncrementor = 1;
      while (cardLoadIncrementor <= 18){
        this.load.image('card' + cardLoadIncrementor, 'src/assets/img/cards/egoCard-' + cardLoadIncrementor + '.png');
        cardLoadIncrementor ++;
      }

      
      
    
  }

  create() {
    var height;
    var width;

    

    if (typeof this.game.config.height === "number"){
      height = this.game.config.height;
    }

    if (typeof this.game.config.width === "number"){
      width = this.game.config.width;
    }

    this.player = new Player(this,"bob");// Player object
    this.enemy = new Player(this,"Computer");// Enemy player object
  

    this.playerSprite = this.add.sprite(this.cameras.main.width / 2,this.cameras.main.height / 2, 'player'); // Player Sprite
    //Add and set background
    this.background = this.add.image(0, 0, 'background').setOrigin(0,0);
    this.background.setDisplaySize(width, height);

    //Add and set player and enemy deck sprites
    this.playerDrawDeck = this.add.sprite(20 , 700, 'card1').setDisplaySize(130, 150).setOrigin(0,1);
    this.playerDrawDeck.setInteractive().on('pointerdown', () => this.drawCard(this.player));

    this.enemyDrawDeck = this.add.sprite(1120, 180, 'card1').setDisplaySize(130, 150).setOrigin(1, 0);
    this.enemyDrawDeck.setAngle(180);

    //Add enemy and player Card Zones
    let playerCardZone = this.add.rectangle(200, 700, 1000, 160, 0x000000).setAlpha(.7).setOrigin(0,1);
    let enemyCardZone = this.add.rectangle(80, 190, 1000, 160, 0x000000).setAlpha(.7).setOrigin(0,1);

    //Add enemy and player Discard Pile Zones
    let playerDiscardPile = this.add.rectangle(1100, 530, 140, 160, 0x000000).setOrigin(0,1).setAlpha(.5);
    let enemyDiscardPile = this.add.rectangle(50, 365, 140, 160, 0x000000).setOrigin(0,1).setAlpha(.5);
    

    //Interactive Text Box
  this.clickButton = this.add.text(50, 480, `Change turn`, {
    color: '#000000',
    fontSize: '24px',
    fontStyle: 'bold'
  })
    .setInteractive()
    .on('pointerdown', () => this.endTurn(this.player) );

  // //Player Show health
  // this.playerHeath= this.add.text(200, 15 , `Player health: ${this.player.getHealth()}`, {
  //   color: '#000000',
  //   fontSize: '16px'
  // })

  //Enemy Player Show health
  this.enemyHealth= this.add.text(this.cameras.main.width - 300, 280 , `Enemy health: ${this.enemy.getHealth()}`, {
    color: '#000000',
    fontSize: '24px',
    fontStyle: 'bold'
  })

  //Show Hand button
  // this.showDeck = this.add.text(50,50,'Show Deck', {
  //   color: '#000000',
  //   fontSize: '24px'
  // })
  //   .setInteractive()
  //   .on('pointerdown', () => this.displayDeck(this.player) );
  
  //Status indicator Text
  this.statusBox = this.add.text(500,500, `Status Box: `,  {
    color: '#000000',
    fontSize: '24px',
    fontStyle: 'bold'
  });

  //Card Count indicator
  this.cardCount = this.add.text(this.cameras.main.width - 900, 510, `Cards in Player hand: ${this.player.getDeck().getFilledSlots()}`, {
    color: '#000000',
    fontSize: '24px',
    fontStyle: 'bold'
  }).setOrigin(1, 0)

  //Sams Addition
  this.healthText=this.add.text(50, 375, `Current Health: ${this.player.getHealth()}/${this.player.getMaxHealth()}`,{
    color: '#000000',
    fontSize: '24px',
    fontStyle: 'bold'
  })
  //.setOrigin(1,0)

  this.energyText=this.add.text(600, 375, `Player Energy: /20`,{
    color: '#000000',
    fontSize: '24px',
    fontStyle: 'bold'
  })


  this.shuffleText = this.add.text(50, 440, 'Shuffle Cards', {
    color: '#000000',
    fontSize: '24px',
    fontStyle: 'bold'
    //font: 'Press Start 2P'
  })
  .setInteractive()
  .on('pointerdown', ()=>this.player.playerDeck.shuffle())

  this.healthBar=this.makeBar(50, 405, 0xe74c3c);
  this.setValue(this.healthBar,this.player.getHealth()/this.player.getMaxHealth());

  this.enemyHealthbar= this.makeBar(970, 310,0x0000ff);


  this.energyBar= this.makeBar(600, 405, 0xe74c3c);


 // this.setValue(this.enemyHealthbar, this.)



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
      this.add.text(this.cameras.main.width - 900, index * 50 + 200  , `Name: ${card.name} Damage: ${card.damage} Cost: ${card.cost}` , {
        color: '#000000',
        fontSize: '24px',
        fontStyle: 'bold'
      })
    });
  }

  
  cardSelected(card : Card){
    console.log(card);
  }

  // Draw a card and add to players hand
  drawCard(player: Player){
   if(player.isTurn()){
      var randCard = 1 + Math.floor((Math.random()*17));
      console.log(randCard);
      switch(randCard){
        case 1: {
          player.addCard(new Card("Little Helper", 1, 0, 2));
          break;
        }

        case 2: {
          player.addCard(new Card("Pick Me Up", 2, 0, 3));
          break;
        }

        case 3: {
          player.addCard(new Card("Super Smile", 3, 0, 4));
          break;
        }

        case 4: {
          player.addCard(new Card("Recover", 2, 0, 5));
          break;
        }

        case 5: {
          player.addCard(new Card("Reflect", 4, 7, 6));
          break;
        }

        case 6: {
          player.addCard(new Card("Boom", 3, 5, 7));
          break;
        }

        case 7: {
          player.addCard(new Card("BloodLust", 4, 7, 8));
          break;
        }

        case 8: {
          player.addCard(new Card("Lightning Bolt", 2, 3, 9));
          break;
        }

        case 9: {
          player.addCard(new Card("Counting Sheep", 3, 5, 10));
          break;
        }

        case 10: {
          player.addCard(new Card("Shield", 2, 0, 11));
          break;
        }

        case 11: {
          player.addCard(new Card("Power Boost", 3, 0, 12));
          break;
        }

        case 12: {
          player.addCard(new Card("Reflection Shield", 5, 0, 13));
          break;
        }

        case 13: {
          player.addCard(new Card("Fresh Water", 0, 0, 14));
          break;
        }

        case 14: {
          player.addCard(new Card("Home Cooked Meal", 0, 0, 15));
          break;
        }

        case 15: {
          player.addCard(new Card("Apple", 0, 0, 16));
          break;
        }

        case 16: {
          player.addCard(new Card("Win/Win Situation", 5, 5, 17));
          break;
        }

        case 17:{
          player.addCard(new Card("Power Nap", 5, 0, 18));
          break;
        }
      }
      /*
      if(randCard<1){
        player.addCard( new Card("Buff", 2, 4) ); 
      }
      else if(randCard<2){
        player.addCard( new Card("Heal", 2, 4) ); 
      }
      else{
        player.addCard( new Card("Attack", 2, 4) ); 
      }
      */
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
  makeVBar(x, y,color) {
    let Vbar = this.add.graphics();

    Vbar.fillStyle(color, 1);

    Vbar.fillRect(0, 0, 25, 300);
    
    Vbar.x = x;
    Vbar.y = y;

    return Vbar;
  }
  showHand(){
    if(this.player.getDeck()!=null){
      let c=1;
      for(let i of this.player.getDeck().getDeck()){
        this.loadCardSprite(i, (c * 130) + 100, 700);
        
        /*let card=this.add.graphics();
        card.lineStyle(5, 0x000000, 1.0);
        card.fillStyle(0xFFFFFF, 1.0);
        card.fillRect((c+1)*(this.cameras.main.width/(this.player.getDeck().getSize()+2)), 300, 70, 100);
        card.strokeRect((c+1)*(this.cameras.main.width/(this.player.getDeck().getSize()+2)), 300, 70, 100);
        /*
        if (i.getName() == "Buff"){
          let card = this.add.sprite((c+1) * (this.cameras.main.width/(this.player.getDeck().getSize()+2)), 300, 'buffCardBase');
          card.displayWidth = 70;
          card.displayHeight = 100;
          card.setOrigin(0,0);

          let cardText = this.add.text((c+1) * (this.cameras.main.width/(this.player.getDeck().getSize()+2))+5, 305, i.getName(),{
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

        }

        else if(i.getName() == "Attack"){
          let card = this.add.sprite((c+1) * (this.cameras.main.width/(this.player.getDeck().getSize()+2)), 300, 'attackCardBase');
          card.displayWidth = 70;
          card.displayHeight = 100;
          card.setOrigin(0,0);  

          let cardText = this.add.text((c+1) * (this.cameras.main.width/(this.player.getDeck().getSize()+2))+5, 305, i.getName(),{
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
        }

        else if(i.getName() == "Heal"){
          let card = this.add.sprite((c+1) * (this.cameras.main.width/(this.player.getDeck().getSize()+2)), 300, 'healCardBase');
          card.displayWidth = 70;
          card.displayHeight = 100;
          card.setOrigin(0,0);

          let cardText = this.add.text((c+1) * (this.cameras.main.width/(this.player.getDeck().getSize()+2))+5, 305, i.getName(),{
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
        }

        
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
        */
        c++;
  
      }
    }
  }

  //Loads card sprite
  loadCardSprite(card, x, y){
    let cardSprite = this.add.sprite(x, y, 'card' + card.getIndex()).setInteractive();
    cardSprite.setOrigin(0, 1);
    cardSprite.setDisplaySize(130, 150);

    /*
    if (card.getName() == "Attack"){
      let cardSprite = this.add.sprite(x, y, 'attackCardBase');
      cardSprite.setOrigin(0,0);
      cardSprite.displayHeight = 110;
      cardSprite.displayWidth = 75;
    }

    else if (card.getName() == "Heal"){
      let cardSprite = this.add.sprite(x, y, 'healCardBase');
      cardSprite.setOrigin(0,0);
      cardSprite.displayHeight = 110;
      cardSprite.displayWidth = 75;
    }

    else if (card.getName() == "Buff"){
      let cardSprite = this.add.sprite(x, y, 'buffCardBase');
      cardSprite.setOrigin(0,0);
      cardSprite.displayHeight = 110;
      cardSprite.displayWidth = 75;
    }

    

    let cardText = this.add.text(x + 5, y + 5, card.getName(),{
      color: '#000000',
      fontSize: '18px'
    });

    let cardDamage=this.add.text(x + 55, y + 80, card.getDamage(),{
      color: '#000000',
      fontSize: '18px'
    });

    let cardCost=this.add.text(x + 5, y + 80, card.getCost(),{
      color: '#000000',
      fontSize: '18px'
    });
    */
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
      this.playerDrawDeck.removeInteractive();
      this.cardCount.setText(`Players hand is full - Count: ${this.player.getDeck().getFilledSlots()}`);
    }else {
      this.playerDrawDeck.setInteractive();
      this.cardCount.setText(`Cards in Player hand: ${this.player.getDeck().getFilledSlots()}`);
    }
    
    this.healthText.setText(`Current Health: ${this.player.getHealth()}/${this.player.getMaxHealth()}`);


  }

  
}
