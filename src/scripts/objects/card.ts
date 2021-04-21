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

  public getName(): string{
    return this.name;
  }

  public getRank(): number{
    return this.rank;
  }

  public getType(): string{
    return this.type;
  }

  public getHappiness(): number{
    return this.happiness;
  }

}