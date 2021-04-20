
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
  playerDeck: Deck;
  count: number = 0;
  position: number[] = [0,0]

  constructor(scene,name: string) {
    super(scene, 'sprite')
    this.name = name;
    this.health = 100;
    this.playerDeck = new Deck();

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

  public getDeck(){
    return this.playerDeck;
  }

  public getHealth(){
    return this.health;
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