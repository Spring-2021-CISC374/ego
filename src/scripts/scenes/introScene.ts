export default class IntroScene extends Phaser.Scene {
    battleCounter=0;
    worldText;
    worldText2;
    index = 0;
    playerSelector;
    char1;
    char2;
    char3;

    background;

    constructor() {
        super({ key: 'IntroScene' })
      }
    
      init(data)
      {
          this.battleCounter = data.id;
          console.log(this.battleCounter);
          this.playerSelector = data.ps;
      }

    preload(){ 
        console.log("intro scene");
        this.load.image("player1","assets/img/charSpriteSouth.png");
        this.load.image("player2","assets/img/char2/spriteSouth1.png")
        this.load.image("player3","assets/img/char3/spriteSouth1.png")
    }

    advanceText(index){
        console.log("advancing text...");
            if(index==0)
            {
                this.worldText = this.add.text(50, 200, ['Ego is a strategy card game. All cards have an "energy cost".'])
                .setFontSize(35)
                .setFontFamily('Copperplate')
                .setColor('#FFFFFF') 
            }
            if (index==1)
            {
                this.worldText = this.add.text(150, 275, ['Energy is collected throughout a round of Ego'])
                .setFontSize(40)
                .setFontFamily('Copperplate')
                .setColor('#FFFFFF')

            }
            if (index==2)
            {
                this.worldText = this.add.text(50, 350, ['There are 3 main card types: Attacking, Defending and Healing.'])
                .setFontSize(35)
                .setFontFamily('Copperplate')
                .setColor('#FFFFFF')
            }

            if(index==3)
            {
                this.worldText = this.add.text(100, 425, ['Click on the character you would like to use in your adventure'])
                .setFontSize(35)
                .setFontFamily('Georgia')
                .setColor('#FFFF11')  
                
                this.char1 = this.physics.add.image(450,600,"player1")
                .setInteractive()
                .on('pointerdown', () => this.scene.start('WorldScene',{id:this.battleCounter,bool: false,ps:0}))
                .on('pointerover', () => this.char1.setTint(0x97F797))
                .on('pointerout', () => this.char1.clearTint());
                
                this.char2 = this.physics.add.image(750,600,"player2")
                .setInteractive()
                .on('pointerdown', () => this.scene.start('WorldScene',{id:this.battleCounter,bool: false,ps:1}))
                .on('pointerover', () => this.char2.setTint(0x97F797))
                .on('pointerout', () => this.char2.clearTint());;
                
                this.char3 = this.physics.add.image(600,600,"player3")
                .setInteractive()
                .on('pointerdown', () => this.scene.start('WorldScene',{id:this.battleCounter,bool: false,ps:2}))
                .on('pointerover', () => this.char3.setTint(0x97F797))
                .on('pointerout', () => this.char3.clearTint());;
                
            }
        }

    
    create()
    {
        console.log("tutorial scene created")

        this.background = this.add.tileSprite(0,0,0,0,'backgroundIntro');
        this.background.setDisplaySize(1280, 720)
        this.background.setOrigin(0,0); 

        this.worldText = this.add.text(50, 660, ['Click to Advance Text'])
        .setFontSize(30)
        .setFontFamily('Trebuchet MS')
        .setColor('#FFFF17')
        .setInteractive()
        .on('pointerdown', () => this.advanceText(this.index++))
        .on('pointerover', () => this.worldText.setTint(0x00ff00))
        .on('pointerout', () => this.worldText.clearTint());

        this.worldText2 = this.add.text(425, 100, ['Welcome to Ego!'])
        .setFontSize(55)
        .setFontFamily('Copperplate')
        .setColor('#FFFF11')
    }
    update()
    {
        this.background.tilePositionY -= 6;
        this.background.tilePositionX -= 10;
    }
}