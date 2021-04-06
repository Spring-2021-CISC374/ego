
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
  playerDeck: Deck;
  count: number = 0;

  constructor(scene,name: string) {
    this.name = name;
    this.playerDeck = new Deck(12);

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

}