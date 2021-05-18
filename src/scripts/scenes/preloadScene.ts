export default class PreloadScene extends Phaser.Scene {
  
  goToWorld;
  backgroundIntro;
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    this.load.image('backgroundIntro','assets/img/stars.png');
    this.load.image('logo','assets/img/egoLogo.png'); 
    this.load.image("player1","assets/img/charSpriteSouth");
    this.load.image("player2","assets/img/char2/spriteSouth1")
  }

  create() {
    
    console.log("title");
    this.backgroundIntro = this.add.tileSprite(0,0,0,0,'backgroundIntro');
    this.backgroundIntro.setDisplaySize(1280, 720)
    this.backgroundIntro.setOrigin(0,0);

    let logo = this.add.sprite(640,300,'logo');
    logo.setDisplaySize(600,350)


    
    this.goToWorld = this.add.text(460, 550, ['START GAME'])
  .setFontSize(65)
  .setFontFamily('Trebuchet MS')
  .setColor('#FFFF17')
  .setInteractive()
  .on('pointerdown', () =>this.scene.start('IntroScene',{id:0, bool:false,ps:1}))
  .on('pointerover', () => this.goToWorld.setTint(0x00ff00))
  .on('pointerout', () => this.goToWorld.clearTint())
  }

  update()
  {
    this.backgroundIntro.tilePositionY -= 6;
    this.backgroundIntro.tilePositionX -= 10;
  }
}
