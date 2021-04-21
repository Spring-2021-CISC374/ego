import PhaserLogo from '../objects/phaserLogo';
import FpsText from '../objects/fpsText';
import Player from '../objects/player';
import Card from '../objects/card'
export default class MainScene extends Phaser.Scene {
    
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

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    // new PhaserLogo(this, this.cameras.main.width / 2, 0)
    //this.fpsText = new FpsText(this)
    this.player = new Player(this,"bob");
    this.initializeDeck();
    // display the Phaser.VERSION
    this.add
      .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
        color: '#000000',
        fontSize: '24px'
      })
      .setOrigin(1, 0)

    this.healthText=this.add.text(100, 15, `Current Health: ${this.player.getHealth()}/${this.player.getMaxHealth()}`,{
      color: '#000000',
      fontSize: '24px'
    })
    //.setOrigin(1,0)
    
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

    this.shuffleText = this.add.text(100, 250, 'Shuffle Cards', {
      color: '#000000',
      fontSize: '24px',
    })
    .setInteractive()
    .on('pointerdown', ()=>this.player.playerDeck.shuffle())

    this.healthBar=this.makeBar(100, 50, 0xe74c3c);
    this.setValue(this.healthBar,this.player.getHealth()/this.player.getMaxHealth());
  
  
  }

  initializeDeck(){
    this.player.addToDeck(new Card("Little Helper", "Health Recovery", 1, 3));
    this.player.addToDeck(new Card("Pick Me Up", "Health Recovery", 2, 5));
    this.player.addToDeck(new Card("Super Smile", "Health Recovery", 3, 7));
    this.player.addToDeck(new Card("Reflect", "Attack", 4, 7));
    this.player.addToDeck(new Card("Recover", "Health Recovery", 2, 3));
    this.player.addToDeck(new Card("Boom", "Attack", 3, 5));
    this.player.addToDeck(new Card("Shield", "Defense", 2, 3));
    this.player.addToDeck(new Card("Lightning Bolt", "Attack", 2, 3));
    this.player.addToDeck(new Card("Bloodlust", "Attack", 4, 7));
    this.player.addToDeck(new Card("Counting Sheep", "Attack", 3, 5));
    this.player.addToDeck(new Card("Power Boost", "Defense", 4,7));
    this.player.playerDeck.shuffle();
  }

  buttonPressed(player: Player){
    player.changeTurn();
    if(player.isTurn()){
      this.clickButton.setText(`Change turn: It is ${player.getName()}'s turn `);  
    }else{
      this.clickButton.setText(`Change turn: It is the computer's turn`);
    }
    
    //console.log(player.isTurn());
  }


  drawCard(player: Player){
    if(player.isTurn()){
      player.addToHand(player.playerDeck.deck[0])
      console.log(player.playerDeck);
      console.log(player.playerHand);
      this.buttonPressed(player);
      this.player.changeHealth(1);
    }
    else{
      this.player.changeHealth(-1);
    }


    
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
  if(this.player.getHand()!=null){
    let c=0;
    for(let i of this.player.getHand().getDeck()){
      let card=this.add.graphics();
      card.lineStyle(5, 0x000000, 1.0);
      card.fillStyle(0xFFFFFF, 1.0);
      card.fillRect((c+1)*(this.cameras.main.width/(this.player.getHand().getSize()+2)), 300, 70, 100);
      card.strokeRect((c+1)*(this.cameras.main.width/(this.player.getHand().getSize()+2)), 300, 70, 100);

      let cardText=this.add.text((c+1)*(this.cameras.main.width/(this.player.getHand().getSize()+2))+5, 305,i.getName(),{
        color: '#000000',
        fontSize: '14px'
      });
      let cardHappiness=this.add.text((c+1)*(this.cameras.main.width/(this.player.getHand().getSize()+2))+55, 380,i.getHappiness(),{
        color: '#000000',
        fontSize: '18px'
      });
      let cardRank=this.add.text((c+1)*(this.cameras.main.width/(this.player.getHand().getSize()+2))+5, 380,i.getRank(),{
        color: '#000000',
        fontSize: '18px'
      });
      c++;

    }
  }
}

  update() { 
    this.statusBox.setText(`${(this.player.isTurn()) ? "Player can Draw Card" : "Player cannot draw card"}`)
    this.setValue(this.healthBar,this.player.getHealth()/this.player.getMaxHealth());
    
    this.showHand();

    if(this.player.getHand().isFull()){
      this.dealText.removeInteractive();
      this.cardCount.setText(`Players hand is full - Count: ${this.player.getDeck().getFilledSlots()}`);
    }else {
      this.dealText.setInteractive();
      this.cardCount.setText(`Cards in Player hand ${this.player.getDeck().getFilledSlots()}`);
    }

    this.healthText.setText(`Current Health: ${this.player.getHealth()}/${this.player.getMaxHealth()}`);
    
  }

  





}
