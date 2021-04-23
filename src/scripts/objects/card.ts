export default class Card {

  name: string;
  type: string;
  rank: number;
  happiness: number;
  energy: number;
  damage : number;
  cost: number;

  constructor(name: string, type: string, rank: number, happiness: number, energy: number){
    this.name = name;
    this.type= type;
    this.rank= rank;
    this.happiness= happiness;
    this.energy= energy;

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