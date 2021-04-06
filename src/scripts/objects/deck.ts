import Card from './card';

export default class Deck {

  size: number;
  deck: Array<Card>;

  constructor(){
    this.size = 12;
    this.deck = new Array<Card>() ;

  }

  public getSize():number {
    return this.size;
  }

  public isFull(): boolean{
    return this.deck.length >= this.size;
  }

  public addCard(newcard : Card){
    this.deck.push(newcard);
  }  

  public getFilledSlots(): number{
    let count = 0;

    this.deck.forEach(function(value){
      if(value != null) count++;
    } );
    return count;
  }

}