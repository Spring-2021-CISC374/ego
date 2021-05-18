import { Sleeping } from 'matter';
import Character from '../objects/character'
import House from '../objects/house'

export default class WorldScene extends Phaser.Scene {
    
  character: Character;
  cursorKeys;
  theCloud;
  battleCounter = 0;
  battleText; 
  goToBattle;
  charData: Character;
  char;
  theHouse;
  collChecker: Boolean;
  hasTalked: Boolean;
  talkToElder;
  houseFlag;
  temp;
  theElder;
  edlerText;
  enemyFlag;
  enemy;
  victoryText;
  playerSelector;
  theFlag;
  worldText;

  constructor() {
    super({ key: 'WorldScene' })
  }

  init(data)
  {
    this.battleCounter = data.id;
    this.hasTalked = data.bool;
    this.playerSelector = data.ps;
    console.log(this.battleCounter);
    console.log(this.hasTalked);
    console.log(this.playerSelector);
  }

  preload(){
  this.load.image("spriteSouth","assets/img/charSpriteSouth.png")
  this.load.image("spriteNorth","assets/img/charSpriteNorth.png")
  this.load.image("spriteEast","assets/img/charSpriteEast.png")
  this.load.image("spriteWest","assets/img/charSpriteWest.png")

  this.load.image("spriteSouth1","assets/img/char2/spriteSouth1.png")
  this.load.image("spriteNorth1","assets/img/char2/spriteNorth1.png")
  this.load.image("spriteEast1","assets/img/char2/spriteEast1.png")
  this.load.image("spriteWest1","assets/img/char2/spriteWest1.png")

  this.load.image("spriteSouth2","assets/img/char3/spriteSouth1.png")
  this.load.image("spriteNorth2","assets/img/char3/spriteNorth1.png")
  this.load.image("spriteEast2","assets/img/char3/spriteEast1.png")
  this.load.image("spriteWest2","assets/img/char3/spriteWest1.png")

  this.load.image("grass","assets/img/overworld/grassTexture.png")
  this.load.image("house","assets/img/house.png")
  this.load.image("cloud1","assets/img/clouds/largeCloud.png")
  this.load.image("cloud2","assets/img/clouds/mediumCloud.png")
  this.load.image("cloud3","assets/img/clouds/smallCloud.png")
  this.load.image("elder","assets/img/elderSprite.png")
  this.load.image("enemy1","assets/img/egoEnemies-01.png")
  this.load.image("enemy2","assets/img/egoEnemies-02.png")
  this.load.image("enemy3","assets/img/egoEnemies-03.png")
  }
  
  create() {


    //flag for enemy animation
    this.enemyFlag = 0;

    //flag for instructions
    this.theFlag = 0;

    console.log("world scene created")
    let background = this.add.sprite(0,0,'grass');
    background.setDisplaySize(1280,720);
    background.setOrigin(0,0);
    
    console.log(this.playerSelector);
    switch(this.playerSelector){
    case 0:
        this.char = this.physics.add.image(50,200,"spriteEast")
        this.char.body.setSize(this.char.width,this.char.height,true);
        break;
    case 1: 
      this.char = this.physics.add.image(50,200,"spriteEast1")
      this.char.body.setSize(this.char.width,this.char.height,true);
      break;
    case 2: 
      this.char = this.physics.add.image(50,200,"spriteEast2")
      this.char.body.setSize(this.char.width,this.char.height,true);
      break;  

    }
    this.charData =  new Character(
      this, 
      this.scale.width / 2 - 8, 
      this.scale.height - 64);
    this.char.setDisplaySize(100, 100)

    this.cursorKeys = this.input.keyboard.createCursorKeys();



    this.theHouse = this.physics.add.image(725,500,"house")
    this.theHouse.setDisplaySize(400, 200)
    this.theHouse.setOrigin(0,0);
    this.theHouse.body.setSize(this.theHouse.width,this.theHouse.height,true);

    this.theCloud = this.add.sprite(850,350,"cloud1");
    this.theCloud.setDisplaySize(150, 150)
    this.theCloud.setOrigin(0,0);
    
    this.theElder = this.physics.add.sprite(1100,50,"elder");
    this.theElder.setDisplaySize(64, 100)
    this.theElder.setOrigin(0,0);
    this.theElder.body.setSize(this.theElder.width,this.theElder.height,true);
    
    if (this.hasTalked == false)
      this.generateEnemy();
    /*
    this.goToBattle = this.add.text(100, 300, ['GO TO BATTLE!'])
    .setFontSize(18)
    .setFontFamily('Trebuchet MS')
    .setColor('#000000')
    .setInteractive()
    .on('pointerdown', () => this.scene.start('MainScene',{id:this.battleCounter}));
*/

    this.edlerText = this.add.text(1090, 150, ['Wise Elder'])
        .setFontSize(18)
        .setFontFamily('Trebuchet MS')
        .setColor('#FFFFFF')
    
    this.collChecker = false
    this.houseFlag = 0;
    this.physics.add.collider(this.char,this.theHouse,this.houseColl,this.houseHandler,this);
    this.physics.add.collider(this.char,this.theElder,this.elderColl,this.elderHandler,this);

        //tutorial

  }

  houseHandler()
  {
    if (this.hasTalked==false){
      this.movePlayer()
      this.talkToElder = this.add.text(50, 650, ['You Should Talk To The Elder First.'])
      .setFontSize(20)
      .setFontFamily('Trebuchet MS')
      .setColor('#FFFFFF');
    }
    else{
      this.scene.start('MainScene',{id:this.battleCounter,ps: this.playerSelector});
    }
    console.log("-----------");
  }
  
  houseColl(char, theHouse)
  {
    this.temp = this.charData.direction
    this.collChecker = true;
    console.log("Collision Detected")
  }

  elderHandler()
  {
    this.talkToElder = this.add.text(50, 600, ['Talk to the elder?'])
    .setFontSize(20)
    .setFontFamily('Trebuchet MS')
    .setColor('#FFFFFF');

    this.talkToElder = this.add.text(240, 600, ['Click Here To Confirm'])
    .setFontSize(18)
    .setFontFamily('Trebuchet MS')
    .setColor('#FFFF13')
    .setInteractive()
    .on('pointerdown', () => this.scene.start('TutScene',{id:this.battleCounter,ps:this.playerSelector}))
    .on('pointerover', () => this.talkToElder.setTint(0x00ff00))
    .on('pointerout', () => this.talkToElder.clearTint());;

    this.movePlayer();
  }
  
  elderColl(char, theElder)
  {
    this.temp = this.charData.direction
    this.collChecker = true;
    console.log("Collision Detected")
  }

  checkKeys(){
  if (this.cursorKeys.up.isDown && this.char.y>64) {
      this.spriteMovement("up",0,-4);
      return
    } else if (this.cursorKeys.down.isDown && this.char.y <720-64) {
      this.spriteMovement("down",0,4);
      return
    }
    if (this.cursorKeys.left.isDown&&this.char.x > 35) {
      this.spriteMovement("left",-4,0);
      return
    }else if (this.cursorKeys.right.isDown&& this.char.x <1280-64) {
      this.spriteMovement("right",4,0);
      return
    }
  }

  spriteMovement(direction: string, xspeed:number,yspeed:number)
  {
    this.charData.movement(direction);
    this.char.x += xspeed;
    this.char.y += yspeed;

    if (direction == "up"){
    switch(this.playerSelector){
      case 0:
        this.char.setTexture("spriteNorth")
        break;
      case 1:
        this.char.setTexture("spriteNorth1")
        break;
      case 2:
        this.char.setTexture("spriteNorth2");
        break;
    }}
    if (direction == "down"){
      switch(this.playerSelector){
        case 0:
          this.char.setTexture("spriteSouth")
          break;
        case 1:
          this.char.setTexture("spriteSouth1")
          break;
        case 2:
          this.char.setTexture("spriteSouth2");
          break;
      }}
      if (direction == "left"){
        switch(this.playerSelector){
          case 0:
            this.char.setTexture("spriteWest")
            break;
          case 1:
            this.char.setTexture("spriteWest1")
            break;
          case 2:
            this.char.setTexture("spriteWest2");
        }}
        if (direction == "right"){
          switch(this.playerSelector){
            case 0:
              this.char.setTexture("spriteEast")
              break;
            case 1:
              this.char.setTexture("spriteEast1")
              break;
            case 2:
              this.char.setTexture("spriteEast2")
              break;
          }}
  }

  updateCloud(){
    if (this.battleCounter==0){
      this.theCloud.setTexture("cloud1");
    }
    if (this.battleCounter==1){
      this.theCloud.setTexture("cloud2");
      this.theCloud.y = 400;
      this.theCloud.x = 880;
    }
    if (this.battleCounter==2 ){
      this.theCloud.setTexture("cloud3");
      this.theCloud.y = 410;
      this.theCloud.x = 890;
    }
    if (this.battleCounter>2)
      this.theCloud.destroy()
  }
  
  movePlayer(){
    if (this.collChecker==true){
    console.log("Handling collision...");
    console.log("Detected while moving:")
    console.log(this.charData.direction)
    if (this.charData.direction === "right")
    {
      this.char.setTexture("spriteEast")
      for (let i = 0; i < 35; i++){
        this.char.x -= 1
        this.char.setTexture("spriteEast")
        this.sleep(10)
        }
        console.log("moved left")
        return
    }
    if (this.temp==="left")
    {
      for (let i = 0; i < 35; i++){
      this.char.x += 1
      this.char.setTexture("spriteEast")
      this.sleep(10)
      }
      console.log("moved right")
      return
    } 
    if (this.charData.direction === "down")
    {
      for (let i = 0; i < 35; i++){
        this.char.y -= 1
        this.char.setTexture("spriteUp")
        this.sleep(10)
        }
        console.log("moved right")
        return
    }   
    if (this.charData.direction ==="up")
    {
      for (let i = 0; i < 35; i++){
        this.char.y += 1
        this.char.setTexture("spriteDown")
        this.sleep(10)
        }
        console.log("moved right")
        return
    }
    this.collChecker=false;
    this.houseFlag = 0;
    }
  }

  generateEnemy()
  {
    switch(this.battleCounter){
      case 0:
        break;
      case 1:
        this.victoryText = this.add.text(15, 15, ['You won the battle! You scared off an Anxiety Bug!'])
        .setFontSize(20)
        .setFontFamily('Trebuchet MS')
        .setColor('#FFFFFF');
        this.enemy = this.physics.add.image(625,500,"enemy3")
        this.enemy.setDisplaySize(200, 200)
        this.enemy.setOrigin(0,0);
        this.enemy.body.setSize(this.theHouse.width,this.theHouse.height,true);
        break;
      case 2:
        this.victoryText = this.add.text(15, 15, ['You won the battle! You scared off a Greedy Goblin!'])
        .setFontSize(20)
        .setFontFamily('Trebuchet MS')
        .setColor('#FFFFFF');
        this.enemy = this.physics.add.image(625,500,"enemy2")
        this.enemy.flipX = true;
        this.enemy.setDisplaySize(200, 200)
        this.enemy.setOrigin(0,0);
        this.enemy.body.setSize(this.theHouse.width,this.theHouse.height,true);
        break;
        case 3:
          this.victoryText = this.add.text(15, 15, ['You won the battle! You scared off a Problematic Python!'])
          .setFontSize(20)
          .setFontFamily('Trebuchet MS')
          .setColor('#FFFFFF');
          this.enemy = this.physics.add.image(625,600,"enemy1")
 
          this.enemy.setDisplaySize(200, 100)
          this.enemy.setOrigin(0,0);
          this.enemy.body.setSize(this.theHouse.width,this.theHouse.height,true);
          break;
    }
  }


  moveEnemy(){
    if (this.enemy.x >= -200)
      this.enemy.x -=4;
  }

  sleep(milliseconds) {
    const date = Date.now();
    let currentDate;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

  update() { 
    this.checkKeys();
    this.updateCloud();
    if (this.battleCounter>0){
        this.moveEnemy();
    }
/*
    if (this.enemy.x <= 0){
      this.enemyFlag = 1;
    }
*/
   //this.checkHouseCollision();
    //this.checkElderCollision();
   // 
  }
  
}