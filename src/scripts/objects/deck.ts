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

  public getDeck(){
    return this.deck;
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

  public shuffle(): boolean{
    if(this.getFilledSlots()!=0){
      var currentIndex = this.getFilledSlots(), temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = this.deck[currentIndex];
        this.deck[currentIndex] = this.deck[randomIndex];
        this.deck[randomIndex] = temporaryValue;
      }

      console.log('Shuffled');
      return true;
    }
    else{
      console.log('Deck Empty');
      return false;
    }
  }

}