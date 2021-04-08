
/**
 * Player consists of a
 *  Name
 *  Deck
 *  Health 
 * 
 */
import Deck from './deck';
import Card from './card';

export default class Player  {

  PlayerTurn: boolean = true;
  name: string;
  health: number;
  maxHealth: number = 100;
  playerDeck: Deck;
  count: number = 0;

  constructor(scene,name: string) {
    this.name = name;
    this.playerDeck = new Deck();
    this.health=this.maxHealth;

    scene.add.existing(this)
    
  }

  public update() {
    this.count += 1;
    if(this.count % 200 == 0){
      this.changeTurn();
      console.log(this.isTurn());
      this.count = 0;
    }
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

}