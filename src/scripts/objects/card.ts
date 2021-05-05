export default class Card {

  name: string;
  type: string;
  rank: number;
  happiness: number;
  energy: number;
  damage : number;
  cost: number;
  energyGain: number;
  shield: number;
  index: number;



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

  public getEnergy(): number{
    return this.energy;
  }

  public getEnergyGain(): number{
    return this.energyGain;
  }

  public getShield(): number{
    return this.shield;
  }

  public getDamage(): number{
    return this.damage;
  }

  public getIndex(): number{
    return this.index;
  }
}