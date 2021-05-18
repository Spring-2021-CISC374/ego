
export default class TutScene extends Phaser.Scene {
    battleCounter=0;
    worldText;
    theElder;
    goToWorld
    playerSelector;
    index = 0;
    
    constructor() {
        super({ key: 'TutScene' })
      }
    
      init(data)
      {
          this.battleCounter = data.id;
          console.log(this.battleCounter)
          this.playerSelector = data.ps;
          console.log(this.playerSelector)
      }

    preload(){ 
        this.load.image("grass","assets/img/overworld/grassTexture.png")
        this.add
        .text(this.cameras.main.width - 15, 15, `Tutorial`, {
          color: '#000000',
          fontSize: '24px'
        })
        .setOrigin(1, 0)
        this.load.image("elder","assets/img/elderSprite.png")
        this.index=0;
    }

    advanceText(index){
        console.log("advancing text...");
        if (this.battleCounter==0){
            if(index==0)
            {
                this.worldText = this.add.text(50, 100, ['Hello! The House of Life is in dire need of your help. '])
                .setFontSize(40)
                .setFontFamily('Copperplate')
                .setColor('#FFFFFF')
            }
            if(index==1)
            {
                this.worldText = this.add.text(50, 200, ['A Mysterious Dark Cloud has taken over and is hurting the House!'])
                .setFontSize(40)
                .setFontFamily('Copperplate')
                .setColor('#FFFFFF') 
            }
            if(index==2)
            {
                this.worldText = this.add.text(50, 300, ['Can you go over and investigate?'])
                .setFontSize(40)
                .setFontFamily('Copperplate')
                .setColor('#FFFFFF')  
                this.worldText = this.add.text(50, 500, ['Click To Go Back To World'])
                .setFontSize(50)
                .setFontFamily('Trebuchet MS')
                .setColor('#FFF111')
                .setInteractive()
                .on('pointerdown', () => this.scene.start('WorldScene',{id:this.battleCounter,bool: true,ps: this.playerSelector}));
            }
        }
        //end of text 1
        if (this.battleCounter==1){
                if(index==0)
                {
                    this.worldText = this.add.text(50, 60, ['Did you see that? The Dark Cloud has shrunk!'])
                    .setFontSize(30)
                    .setFontFamily('Copperplate')
                    .setColor('#FFFFFF')
                }
                if(index==1)
                {
                    this.worldText = this.add.text(50, 120, ['I definetly saw an Anxiety Bug fade off out of the cloud.'])
                    .setFontSize(30)
                    .setFontFamily('Copperplate')
                    .setColor('#FFFFFF') 
                }
                if(index==2)
                {
                    this.worldText = this.add.text(50, 170, ['They create feelings of fear, dread, and uneasiness.'])
                    .setFontSize(40)
                    .setFontFamily('Copperplate')
                    .setColor('#FFFFFF')  
                }
                if (index==3)
                {
                    this.worldText = this.add.text(50, 230, ['While they can cause uncomfortable feelings, they are relatively common around here.'])
                    .setFontSize(30)
                    .setFontFamily('Copperplate')
                    .setColor('#FFFFFF')  
                }
                if (index==4)
                {
                    this.worldText = this.add.text(50, 285,['It is important to be able to handle how Anxiety Bugs'])
                    .setFontSize(30)
                    .setFontFamily('Copperplate')
                    .setColor('#FFFFFF')  
                    this.worldText = this.add.text(50, 320,['can make you feel in a healthy way!'])
                    .setFontSize(30)
                    .setFontFamily('Copperplate')
                    .setColor('#FFFFFF')  
                }
                if (index==5){
                    this.worldText = this.add.text(50, 370,['Go back to House of Life and win more Ego games!'])
                    .setFontSize(30)
                    .setFontFamily('Copperplate')
                    .setColor('#FFFFFF')  
                    this.worldText = this.add.text(50, 500, ['Click To Go Back To World'])
                    .setFontSize(50)
                    .setFontFamily('Trebuchet MS')
                    .setColor('#FFF111')
                    .setInteractive()
                    .on('pointerdown', () => this.scene.start('WorldScene',{id:this.battleCounter,bool: true,ps: this.playerSelector}));
                 }
            }
            //end of text 2
        if (this.battleCounter==2){
            
            if(index==0)
            {
                this.worldText = this.add.text(50, 60, ['Great Job! The Dark Cloud got even smaller.'])
                .setFontSize(30)
                .setFontFamily('Copperplate')
                .setColor('#FFFFFF')
            }
            if(index==1)
            {
                this.worldText = this.add.text(50, 120, ['It looks like you scared off a Greedy Goblin this time.'])
                .setFontSize(30)
                .setFontFamily('Copperplate')
                .setColor('#FFFFFF') 
            }
            if(index==2)
            {
                this.worldText = this.add.text(50, 170, ['They are creatures that take advantage of people, steal,'])
                .setFontSize(40)
                .setFontFamily('Copperplate')
                .setColor('#FFFFFF')  
                this.worldText = this.add.text(50, 220, ['and always are taking more than they need'])
                .setFontSize(40)
                .setFontFamily('Copperplate')
                .setColor('#FFFFFF')  
            }
            if (index==3)
            {
                this.worldText = this.add.text(50, 280, ['These creatures are less common and are quite disliked by people'])
                .setFontSize(30)
                .setFontFamily('Copperplate')
                .setColor('#FFFFFF')  
            }
            if (index==4)
            {
                this.worldText = this.add.text(50, 330,['It is important to appreciate what you have and be'])
                .setFontSize(30)
                .setFontFamily('Copperplate')
                .setColor('#FFFFFF')  
                this.worldText = this.add.text(50, 360,['grateful for life! '])
                .setFontSize(30)
                .setFontFamily('Copperplate')
                .setColor('#FFFFFF')  
            }
            if (index==5){
                this.worldText = this.add.text(50, 420,['Go back to House of Life and win more Ego games!'])
                .setFontSize(30)
                .setFontFamily('Copperplate')
                .setColor('#FFFFFF')  
                this.worldText = this.add.text(50, 500, ['Click To Go Back To World'])
                .setFontSize(50)
                .setFontFamily('Trebuchet MS')
                .setColor('#FFF111')
                .setInteractive()
                .on('pointerdown', () => this.scene.start('WorldScene',{id:this.battleCounter,bool: true,ps: this.playerSelector}));
             }
        }
        if (this.battleCounter==3){
            
            if(index==0)
            {
                this.worldText = this.add.text(50, 60, ['Fantastic! You fully made the Dark Cloud Vanish'])
                .setFontSize(30)
                .setFontFamily('Copperplate')
                .setColor('#FFFFFF')
            }
            if(index==1)
            {
                this.worldText = this.add.text(50, 120, ['The last creature you scared off looked to be a Problematic Python'])
                .setFontSize(30)
                .setFontFamily('Copperplate')
                .setColor('#FFFFFF') 
            }
            if(index==2)
            {
                this.worldText = this.add.text(50, 170, ['These creatures are very mean to people they come across,'])
                .setFontSize(40)
                .setFontFamily('Copperplate')
                .setColor('#FFFFFF')  
                this.worldText = this.add.text(50, 220, ['and make others feel bad for being themselves. '])
                .setFontSize(40)
                .setFontFamily('Copperplate')
                .setColor('#FFFFFF')  
            }
            if (index==3)
            {
                this.worldText = this.add.text(50, 280, ['Never act like a Problematic Python to others.'])
                .setFontSize(30)
                .setFontFamily('Copperplate')
                .setColor('#FFFFFF')  
            }
            if (index==4)
            {
                this.worldText = this.add.text(50, 330,['It is important to be positive and kind to others!'])
                .setFontSize(30)
                .setFontFamily('Copperplate')
                .setColor('#FFFFFF')  
                this.worldText = this.add.text(50, 360,['It goes a long way torwards other'])
                .setFontSize(30)
                .setFontFamily('Copperplate')
                .setColor('#FFFFFF')  
            }
            if (index==5){
                this.worldText = this.add.text(50, 420,['Congradulations! You Helped The House of Life achieve...'])
                .setFontSize(30)
                .setFontFamily('Copperplate')
                .setColor('#FFF111')  
                this.worldText = this.add.text(50, 500, ['MENTAL CLARITY! YOU WIN!'])
                .setFontSize(50)
                .setFontFamily('Copperplate')
                .setColor('#FFF111')
             }
        }
    }

    
    create()
    {
        console.log("tutorial scene created")
        let background = this.add.sprite(0,0,'grass');
        background.setDisplaySize(1280,720);
        background.setOrigin(0,0);
        
        this.worldText = this.add.text(50, 660, ['Click to Speak'])
        .setFontSize(30)
        .setFontFamily('Trebuchet MS')
        .setColor('#FFFF17')
        .setInteractive()
        .on('pointerdown', () => this.advanceText(this.index++));

        this.theElder = this.physics.add.sprite(800,250,"elder");
        this.theElder.setDisplaySize(384, 600)
        this.theElder.setOrigin(0,0);
        this.theElder.body.setSize(this.theElder.width,this.theElder.height,true);
    }
    update()
    {
        
    }
}