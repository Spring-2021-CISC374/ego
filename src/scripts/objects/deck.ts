import Card from './card';

export default class Deck {

  size: number;
  deck: Array<Card>;

  constructor(size:number){
    this.size = size;
    this.deck = new Array<Card>() ;

  }
  
  shuffleCards(cards){
    var currentIndex= cards.length, tempValue, randIndex;
    var shufCards= new Array<Card>();
    while (0!==currentIndex){
      randIndex= Math.floor(Math.random()* currentIndex);
      currentIndex -=1;
      
      tempValue= cards[currentIndex];
      cards[currentIndex]= cards[randIndex];
      cards[randIndex]= tempValue;
    }
      shufCards=cards;
    return shufCards; 
  }
  /*makeDeck(cards){
    
    }
  }*/
  
  public getSize():number {
    return this.size;
  }

  public getDeck(){
    return this.deck;
  }

  public getCard(i: number){
    return this.deck[i];
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