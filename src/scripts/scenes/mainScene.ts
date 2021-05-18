import PhaserLogo from '../objects/phaserLogo';
import FpsText from '../objects/fpsText';
import Player from '../objects/player';
import Card from '../objects/card'
import Deck from '../objects/deck';
import VisualCard from '../objects/visualCard';
import EventDispatcher from '../objects/EventDispatcher';
import eventDispatcher from '../objects/EventDispatcher';
// import BattleScene from './battleScene'
export default class MainScene extends Phaser.Scene {
    
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  energyText;
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
  enemyHealthBar;
  enemyEnergyBar;
  enemyEnergy;
  message;
  statusBox;
  cardCount;
  playerEnergybar;

  playerDrawDeck;
  enemyDrawDeck;
  background;
  playerSprite;
  cardSprites:Array<VisualCard>
  
  HEIGHT;
  WIDTH;

  cardInfo;

  turnCounter:number;



  //should be replaced by user winning battle, here for testing
  goToWorld;

  battleCounter: number;
  playerSelector: number;

  constructor() {
    super({ key: 'MainScene' })
  }

  init(data)
  {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.WIDTH = this.cameras.main.width;
    this.HEIGHT = this.cameras.main.height;
    this.battleCounter = data.id;
    this.playerSelector = data.ps;
    console.log(this.battleCounter);
    console.log(this.playerSelector);
  }


  preload() {
    this.turnCounter = 0;
    /**BATTLE SCENE INDICATOR */
    this.add
      .text(this.cameras.main.width - 15, 15, `Loading Battle...`, {
        color: '#000000',
        fontSize: '24px'
      })
      .setOrigin(1, 0)

      this.load.image('background', 'src/assets/img/backgroundWood.png');
      
      let cardLoadIncrementor = 1;
      while (cardLoadIncrementor <= 18){
        this.load.image('card' + cardLoadIncrementor, 'src/assets/img/cards/egoCard-' + cardLoadIncrementor + '.png');
        cardLoadIncrementor ++;
      }


  }

  create() {
    var height;
    var width;
    this.cardSprites=[];
    this.cardInfo = this.add.text(this.WIDTH/2, this.HEIGHT/2 + 100,'');

    

    if (typeof this.game.config.height === "number"){
      height = this.game.config.height;
    }
    this.player = new Player(this,"bob",false, true);// Player object
    this.enemy = new Player(this,"Computer",true, false);// Enemy player object
    this.goToWorld = this.add.text(0, 700, ['Exit Battle'])
    .setFontSize(18)
    .setFontFamily('Trebuchet MS')
    .setColor('#000000')
    .setInteractive()
    .on('pointerdown', () => this.changeScene('WorldScene'));
    this.initializeDeck();
    this.initializeHand();
    
  
    if (typeof this.game.config.width === "number"){
      width = this.game.config.width;
    }

    eventDispatcher.on('USE_CARD', this.useTest, this);

    
    this.playerSprite = this.add.sprite(this.cameras.main.width / 2,this.cameras.main.height - 30, 'player'); // Player Sprite

    this.background = this.add.image(0, 0, 'background').setOrigin(0,0);
    this.background.setDisplaySize(width, height);
    //Add and set player and enemy deck sprites
    this.playerDrawDeck = this.add.sprite(20 , 700, 'card1').setDisplaySize(130, 150).setOrigin(0,1);
    this.playerDrawDeck.setInteractive().on('pointerdown', () => this.drawCard(this.player)).on('pointerover', () => this.playerDrawDeck.setTint(0x00ff00)).on('pointerout', () => this.playerDrawDeck.clearTint());

    this.enemyDrawDeck = this.add.sprite(1120, 180, 'card1').setDisplaySize(130, 150).setOrigin(1, 0);
    this.enemyDrawDeck.setAngle(180);

    //Add enemy and player Card Zones
    let playerCardZone = this.add.rectangle(200, 700, 1000, 160, 0x000000).setAlpha(.7).setOrigin(0,1);
    let enemyCardZone = this.add.rectangle(80, 190, 1000, 160, 0x000000).setAlpha(.7).setOrigin(0,1);

    //Add enemy and player Discard Pile Zones
    let playerDiscardPile = this.add.rectangle(1100, 530, 140, 160, 0x000000).setOrigin(0,1).setAlpha(.5);
    let enemyDiscardPile = this.add.rectangle(50, 365, 140, 160, 0x000000).setOrigin(0,1).setAlpha(.5);
    
    this.goToWorld = this.add.text(this.WIDTH - 300, this.HEIGHT/2 + 90, ['Exit Battle'])
    .setFontSize(24)
    .setFontFamily('Trebuchet MS')
    .setColor('#000000')
    .setInteractive()
    .on('pointerdown', () => this.changeScene('WorldScene'));
    //Interactive Text Box
    this.clickButton = this.add.text(this.WIDTH - 300, this.HEIGHT/2 + 50 , `End Turn`, {
      color: '#000000',
      fontSize: '24px'
    })
      .setInteractive()
      .on('pointerdown', () => this.switchTurn(this.player,this.enemy) )
      .setFontFamily('Trebuchet MS');

  // //Player Show health
  // this.playerHeath= this.add.text(200, 15 , `Player health: ${this.player.getHealth()}`, {
  //   color: '#000000',
  //   fontSize: '16px'
  // })

 
  //Enemy Player Show health
  this.enemyHealth= this.add.text(this.cameras.main.width - 310, this.cameras.main.height / 2 - 75 , `Enemy health: ${this.enemy.getHealth()}/${this.enemy.getMaxHealth()}`, {
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

  //Sams Addition
  this.healthText=this.add.text(50, 375, `Current Health: ${this.player.getHealth()}/${this.player.getMaxHealth()}`,{
    color: '#000000',
    fontSize: '24px',
    fontStyle: 'bold'
  })
  //.setOrigin(1,0)

  this.energyText=this.add.text(600, 375, `Player Energy: ${this.player.getEnergy()} /${this.player.getMaxEnergy()}`,{
    color: '#000000',
    fontSize: '24px',
    fontStyle: 'bold'
  })

  this.healthBar=this.makeBar(50,400, 0xe74c3c);
  this.setValue(this.healthBar,this.player.getHealth()/this.player.getMaxHealth());

  this.enemyHealthBar=this.makeBar(this.cameras.main.width - 310, this.cameras.main.height / 2 - 45 , 0xe74c3c);
  this.setValue(this.enemyHealthBar,this.enemy.getHealth()/this.enemy.getMaxHealth());

  //this.enemyEnergyBar=this.makeBar(250, this.cameras.main.height / 2 - 45 , 0x000080);
  //this.setValue(this.enemyEnergyBar,100/*CURRENT ENERGY GOES HERE *// 100 /**MAX ENERGY GOES HERE */);

  this.playerEnergybar=this.makeBar(600,400,  0xe74c3c);
  //this.setValue(this.playerEnergybar, this.player.getEnergy()/this.player.getMaxEnergy);
  
  }

  changeScene(word: string){
    console.log('changing scenes...')
    if(this.enemy.getHealth()<=0){
      this.scene.start('WorldScene',{id:this.battleCounter+1,bool:false,ps:this.playerSelector});
    }
    else{
      this.scene.start('WorldScene',{id:this.battleCounter,bool:true,ps:this.playerSelector})
    }
  }

  initializeDeck(){
    this.player.addToDeck(new Card("Little Helper","health", 1, 3, 2));
    this.player.addToDeck(new Card("Pick Me Up","health" ,2, 5, 3));
    this.player.addToDeck(new Card("Super Smile", "health",3, 7, 4));
    this.player.addToDeck(new Card("Recover","health", 2, 3, 5));
    this.player.addToDeck(new Card("Reflect","damage", 4, 7, 6));
    this.player.addToDeck(new Card("Boom","damage" ,3, 5, 7));
    this.player.addToDeck(new Card("BloodLust","damage", 4, 7, 8));
    this.player.addToDeck(new Card("Lightning Bolt","damage", 2, 3, 9));
    this.player.addToDeck(new Card("Counting Sheep","damage", 3, 5, 10));
    this.player.addToDeck(new Card("Shield","shield", 2, 3, 11));
    this.player.addToDeck(new Card("Power Boost","shield", 3, 7, 12));
    this.player.addToDeck(new Card("Reflection Shield","as", 5, 5, 13));
    this.player.addToDeck(new Card("Fresh Water","energy", 0, 1, 14));
    this.player.addToDeck(new Card("Home Cooked Meal","energy", 0, 3, 15));
    this.player.addToDeck(new Card("Apple","energy", 0, 2, 16));
    this.player.addToDeck(new Card("Win/Win Situation","ah", 5, 5, 17));
    this.player.addToDeck(new Card("Power Nap","sh", 5, 0, 18));
    this.player.playerDeck.shuffle();
    this.enemy.addToDeck(new Card("Little Helper","health", 1, 3, 2));
    this.enemy.addToDeck(new Card("Pick Me Up","health" ,2, 5, 3));
    this.enemy.addToDeck(new Card("Super Smile", "health",3, 7, 4));
    this.enemy.addToDeck(new Card("Recover","health", 2, 3, 5));
    this.enemy.addToDeck(new Card("Reflect","damage", 4, 7, 6));
    this.enemy.addToDeck(new Card("Boom","damage" ,3, 5, 7));
    this.enemy.addToDeck(new Card("BloodLust","damage", 4, 7, 8));
    this.enemy.addToDeck(new Card("Lightning Bolt","damage", 2, 3, 9));
    this.enemy.addToDeck(new Card("Counting Sheep","damage", 3, 5, 10));
    this.enemy.addToDeck(new Card("Shield","shield", 2, 3, 11));
    this.enemy.addToDeck(new Card("Power Boost","shield", 3, 7, 12));
    this.enemy.addToDeck(new Card("Reflection Shield","as", 5, 5, 13));
    this.enemy.addToDeck(new Card("Fresh Water","energy", 0, 1, 14));
    this.enemy.addToDeck(new Card("Home Cooked Meal","energy", 0, 3, 15));
    this.enemy.addToDeck(new Card("Apple","energy", 0, 2, 16));
    this.enemy.addToDeck(new Card("Win/Win Situation","ah", 5, 5, 17));
    this.enemy.addToDeck(new Card("Power Nap","sh", 5, 0, 18));
    this.enemy.playerDeck.shuffle();
    //console.log(this.player.playerDeck.deck);


  }


  initializeHand(){
    //console.log(this.player.playerDeck.deck.length)
    this.drawCard(this.player);
    this.drawCard(this.player);
    this.drawCard(this.player);
    this.drawCard(this.enemy);
    this.drawCard(this.enemy);
    this.drawCard(this.enemy);
    //console.log(this.player.playerHand.deck.length)
  }
  
  cardSelected(card : Card){
    console.log(card);
  }

  // Draw a card and add to players hand

  drawCard(player: Player){
    if(player.getHand().getDeck().length<player.getHand().getSize()){
      //console.log(player.playerDeck);
      if(player.getDeck().getDeck().length!=0){
        player.addToHand(player.getDeck().getDeck()[0],0)
        //console.log(player.playerDeck);
        //console.log(player.playerHand);
        // this.endTurn(player);
      }
      else{
        player.getDiscard().getDeck().forEach(card => {
          player.getDeck().addCard(card);
        });
        player.playerDeck.shuffle();
        player.discardPile.deck=[];
        player.changeHealth(-1);

      }
    }
    //console.log(player.getHand().getDeck().length)
    //this.showHand();
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
  
  setValue2(Vbar, percentage) {
    Vbar.scaleX =percentage;
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
    if(this.cardSprites!=null){
      this.cardSprites.forEach(element => {
        element.destroy();
      });
    }
    this.cardSprites=[];
    if(this.player.getHand()!=null){
      let c=1;
      for(let i of this.player.getHand().getDeck()){
        this.loadCardSprite(i, (c * 130) + 100, 700);
        c++;
      }
    }
  }

  //Loads card sprite
  loadCardSprite(card, x, y){
    let cardSprite = new VisualCard(this, x, y, card, this.player, this.enemy);
    this.cardSprites.push(cardSprite);
    /*
    let cardSprite = this.add.sprite(x, y, 'card' + card.getIndex()).setInteractive();
    cardSprite.setOrigin(0, 1);
    cardSprite.setDisplaySize(140, 150);
    */
  }

   //easy enemy AI-attempts to use 2 random cards, then ends turn
   easyEnemy(player: Player){
    for(let tryCount=0; tryCount<2; tryCount++){
        var card=Math.floor(Math.random()*player.getHand().getDeck().length);
        this.useCard(player, player.getHand().getDeck()[card], this.player);
    }
    //console.log(this.enemy.getHand().getDeck());
    this.switchTurn(player,this.player);
  }

  useCard(user:Player, card:Card, opp:Player)
  {
    var type = card.type;
    if (card.getCost() <= user.energy)
    {
      if (type =="damage"){
        opp.changeHealth(-card.effect);
      }
      if (type =="health"){
        user.changeHealth(card.effect);
      }
      if (type == "shield"){
        user.changeShield(card.effect);
      }
      if (type == "energy"){
        user.changeEnergy(card.effect);
      }
      if (type =="as"){
        opp.changeHealth(-card.effect);
        user.changeShield(card.effect);
      }
      if (type =="ah"){
        opp.changeHealth(-card.effect);
        user.changeHealth(card.effect);
      }
      if (type =="sh"){
        user.changeHealth(card.effect);
        user.changeShield(card.effect);
      }
      user.changeEnergy(-card.cost);
      user.useCard(card);
    }
    else{
      console.log("Can't use that!");
    }
    this.showHand();
    //console.log(user.getDiscard().getDeck());
  }

  switchTurn(player: Player, opponent: Player){
    player.changeTurn();
    opponent.changeTurn();
    //console.log(player.getHand().getDeck());
    //console.log(opponent.getHand().getDeck());
    if(player.isTurn()){
      this.drawCard(player);
      player.changeEnergy(1);
      if(player.isEnemy){
        this.easyEnemy(player);
      }
    }
    else if(opponent.isTurn()){
      this.drawCard(opponent);
      opponent.changeEnergy(1);
      if(opponent.isEnemy){
        this.easyEnemy(opponent);
      }
    }
    this.showHand();
  }

  useTest(parameter: Card){
    //console.log(this.player.energy);
    this.useCard(this.player, parameter, this.enemy);
    //console.log(parameter.getName() + ": " + parameter.getType() + " type card, Effect: " + parameter.getEffect());
    //console.log(this.player.energy);
  }
 
initializeBattle()
{
  this.drawCard(this.player);
  this.drawCard(this.player);
  this.drawCard(this.player);

  this.drawCard(this.enemy);
  this.drawCard(this.enemy);
  this.drawCard(this.enemy);
}

  update() { 
    if(this.turnCounter==0){
      console.log("init")
      //this.initializeBattle()
      this.player.PlayerTurn = true;
      this.turnCounter=1;
      this.showHand();
    }

    this.setValue(this.healthBar,this.player.getHealth()/this.player.getMaxHealth());

    //this.showHand();
    
    this.healthText.setText(`Current Health: ${this.player.getHealth()}/${this.player.getMaxHealth()}`);
    this.energyText.setText(`Current Energy: ${this.player.getEnergy()}/${this.player.getMaxEnergy()}`);
    this.setValue(this.enemyHealthBar,this.enemy.getHealth()/this.enemy.getMaxHealth());
    this.enemyHealth.setText(`Enemy Health: ${this.enemy.getHealth()}/${this.enemy.getMaxHealth()}`);
    if(this.player.health<=0){
      this.changeScene('WorldScene')
    }
    if(this.enemy.health<=0){
      this.changeScene('WorldScene')
    }


  }


}