export default class PreloadScene extends Phaser.Scene {
  
  goToWorld;
  background;
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    this.load.image('background','assets/img/stars.png');
    this.load.image('logo','assets/img/egoLogo.png'); 
  }

  create() {
    
    console.log("title");
    this.background = this.add.tileSprite(0,0,0,0,'background');
    this.background.setDisplaySize(1280, 720)
    this.background.setOrigin(0,0);

    let logo = this.add.sprite(640,350,'logo');
    logo.setDisplaySize(600,350)

    this.goToWorld = this.add.text(460, 600, ['START GAME'])
  .setFontSize(65)
  .setFontFamily('Trebuchet MS')
  .setColor('#FFFF17')
  .setInteractive()
  .on('pointerdown', () =>this.scene.start('WorldScene',{id:0, bool:false}))
  }

  update()
  {
    this.background.tilePositionY -= 6;
    this.background.tilePositionX -= 10;
  }
}
