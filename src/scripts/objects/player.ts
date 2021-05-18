/**
 * Player consists of a
 *  Name
 *  Deck
 *  Health 
 * 
 */
 import Deck from './deck';
 import Card from './card';
 
 export default class Player  extends Phaser.GameObjects.GameObject{
 
  
   PlayerTurn: boolean = true;
   name: string;
   health: number;
   maxHealth: number = 25;
   playerDeck: Deck;
   playerHand: Deck;
   count: number = 0;
   position: number[] = [0,0];
   energy: number;
   maxEnergy: number = 20;
  shield:number;
  isEnemy: boolean;
  discardPile: Deck;

  constructor(scene,name: string, enemy:boolean, turn:boolean) {
    super(scene, 'sprite')
    this.name = name;
    this.health = 100;
    this.playerDeck = new Deck(30);
    this.playerHand = new Deck(5);
    this.discardPile = new Deck(30);
    this.health=this.maxHealth;
    this.shield=0;
    this.isEnemy=enemy;
    this.PlayerTurn=turn;
    this.energy= this.maxEnergy/2;

    scene.add.existing(this)
    
  }

 
   public create(){
 
   }
 
   public update() {
     // this.count += 1;
     // if(this.count % 200 == 0){
     //   this.changeTurn();
     //   console.log(this.isTurn());
     //   this.count = 0;
     // }
 
 
 
   }
 
   public isTurn(): boolean {
     return this.PlayerTurn;
   }
 
   public changeTurn(): void{
     this.PlayerTurn = !this.PlayerTurn;
   }
 
   public addToDeck(newcard: Card): void{
    this.playerDeck.addCard(newcard);
  }

  public addToHand(newcard: Card,position: number): void{
    this.playerHand.addCard(newcard);
    this.playerDeck.deck.splice(position,1);
  }

  public useCard(usecard: Card): void{
    //console.log(this.playerHand.deck);
    for (let i = 0; i < this.playerHand.deck.length; i++){
      if (this.playerHand.deck[i] == usecard){
        this.discardPile.addCard(usecard);
        this.playerHand.deck.splice(i,1);
        break;
      }
    }
    //console.log(this.playerHand.deck);
    
  }
 
   public getName(){
    return this.name;
  }

  public getDeck() : Deck{
    return this.playerDeck;
  }


  public getHand():Deck{
    return this.playerHand;
  }

  public getDiscard():Deck{
    return this.discardPile;
  }

  public getHealth(){
    return this.health;
  }

  public getMaxEnergy(){
    return this.maxEnergy;
  }

  public getMaxHealth(){
    return this.maxHealth;
  }

  public getEnergy(){
    return this.energy;
  }

  public changeHealth(change:number){
    var shieldDif=0;
    if(this.shield>0 && change<0){
      shieldDif=this.shield+change;
      if(shieldDif<=0){
        this.health=this.health+(change+this.shield);
      }
      this.changeShield(change);
    }
    else{
      this.health=this.health+change;
    }
    if(this.health<0){
      this.health=0;
    }
    else if(this.health>this.maxHealth){
      this.health=this.maxHealth;
    }
  }

  public changeEnergy(change:number){
    this.energy=this.energy+change;
    if(this.energy<0){
      this.energy=0;
    }
    else if(this.energy>this.maxEnergy){
      this.energy=this.maxEnergy;
    }
  }

  public changeShield(change:number){
    this.shield=this.shield+change;
    if(this.shield<0){
      this.shield=0;
    }
  }

  public setHealth(health){
    this.health = health;
  }

 
   public setPosition( x: number ,y: number): void{
     this.position[0] = x;
     this.position[1] = y;
   }
 
   public getPosition(): number[]{
     return this.position;
   }

   public getShield(): number{
     return this.shield;
   }
 
 }