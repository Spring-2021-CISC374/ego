export default class Card {

  name: string;
  cost : number;
  effect: number;
  index: number;
  type: string;
  
  constructor(name: string, type:string, cost: number, effect : number, index: number){
    this.name = name;
    this.cost = cost;
    this.effect = effect;
    this.index = index;
    this.type = type;
  }
  

  public getCost(): number{
    return this.cost;
  }

  public getEffect(): number{
    return this.effect;
  }

  public getIndex(): number{
    return this.index;
  }

  public getType(): string{
    return this.type;
  }

  public getName(): string {
    return this.name;
  }
}
