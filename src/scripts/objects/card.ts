export default class Card {

  name: string;
  cost : number;
  damage: number;

  constructor(name: string, cost: number, damage : number){
    this.name = name;
    this.cost = cost;
    this.damage = damage;
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

  

}