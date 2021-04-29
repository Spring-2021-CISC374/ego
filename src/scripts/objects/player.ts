
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
  maxHealth: number = 100;
  playerDeck: Deck;
  playerHand: Deck;
  discardPile: Deck;
  count: number = 0;
  position: number[] = [0,0]
  energy: number;
  maxEnergy: number = 10;

  constructor(scene,name: string) {
    super(scene, 'sprite')
    this.name = name;
    this.health = 100;
    this.playerDeck = new Deck(30);
    this.playerHand = new Deck(12);
    this.discardPile = new Deck(30);
    this.health=this.maxHealth;

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

  public addToHand(newcard: Card): void{
    this.playerHand.addCard(newcard);
    this.playerDeck.deck.splice(0,1);
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

  public getHealth(){
    return this.health;
  }

  public getMaxHealth(){
    return this.maxHealth;
  }

  public getEnergy(){
    return this.energy;
  }

  public changeHealth(change:number){
    this.health=this.health+change;
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
      this.health=0;
    }
    else if(this.energy>this.maxEnergy){
      this.energy=this.maxEnergy;
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

}