export default class Card {

  name: string;
  type: string;
  rank: number;
  happiness: number;

  constructor(name: string, type: string, rank: number, happiness: number){
    this.name = name;
    this.type= type;
    this.rank= rank;
    this.happiness= happiness;

  }
  cards: Array<Card>=[
    new Card("Little Helper", "Health Recovery", 1, 3),
    new Card("Pick Me Up", "Health Recovery", 2, 5),
    new Card("Super Smile", "Health Recovery", 3, 7),
    new Card("Reflect", "Attack", 4, 7),
    new Card("Recover", "Health Recovery", 2, 3),
    new Card("Boom", "Attack", 3, 5),
    new Card("Shield", "Defense", 2, 3),
    new Card("Lightning Bolt", "Attack", 2, 3),  
    new Card("Bloodlust", "Attack", 4, 7),
    new Card("Counting Sheep", "Attack", 3, 5),
    new Card("Power Boost", "Defense", 4,7)
  ]


  public getName(): string{
    return this.name;
  }

  public getCost(): number{
    return this.cost;
  }

  public getDamage(): number{
    return this.damage;
  }

  

}