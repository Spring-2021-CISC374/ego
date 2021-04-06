import Card from './card';

export default class Deck {

  size: number;
  deck: Array<Card>;

  constructor(size: number){
    this.size = size;
    this.deck = new Array<Card>(size) ;

  }

  public getSize():number {
    return this.size;
  }

  public isFull(): boolean{
    return this.deck.length >= this.size;
  }

  public addCard(newcard : Card){

  }  

}