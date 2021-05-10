
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
  count: number = 0;
  position: number[] = [0,0];
  energy: number;
  maxEnergy: number = 20;

  constructor(scene,name: string) {
    super(scene, 'sprite')
    this.name = name;
    this.health = 100;
    this.playerDeck = new Deck();
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

  public addCard(newcard: Card): void{
    this.playerDeck.addCard(newcard);
  }

  public getName(){
    return this.name;
  }

  public getDeck() : Deck{
    return this.playerDeck;
  }
  public getEnergy(card, c: number){
    //c= card.cost;
    this.energy=5;
    /*this.energy= this.energy+c
    if(this.energy<0){
      this.energy=0;
    }
    else if(this.energy>this.maxEnergy){
      this.energy=this.maxEnergy;
    }*/
      return this.energy;

  }
  public getMaxenergy(){
    return this.maxEnergy;
  }

  public getHealth(){
    return this.health;
  }

  public getMaxHealth(){
    return this.maxHealth;
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