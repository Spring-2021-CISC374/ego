export default class Card {

  name: string;
  cost : number;
  damage: number;
  index: number;
  
  constructor(name: string, cost: number, damage : number, index: number){
    this.name = name;
    this.cost = cost;
    this.damage = damage;
    this.index = index;
  }

  public getName(): string{
    return this.name;
  }

  public getCost(): number{
    return this.cost;
  }

  public getDamage(): number{
    return this.damage;
  }

  public getIndex(): number{
    return this.index;
  }
}