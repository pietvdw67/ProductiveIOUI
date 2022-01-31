export class ItemDetail {
    
  private id: string;
  private machineId : string;
  private countDate : string;
  private countTime : string;
  private countAmount : string;

  constructor(id: string, machineId: string, countDate: string,countTime: string,countAmount: string){

      this.id = id;
      this.machineId = machineId;
      this.countDate = countDate;
      this.countTime = countTime;
      this.countAmount = countAmount;
  }

  public getId(){
    return this.id;
  }

  public setId(id:string){
    this.id = id;
  }

  public getMachineId(){
    return this.machineId;
  }

  public setMachineId(machineId:string){
    this.machineId = machineId;
  }

  public getCountDate(){
    return this.countDate;
  }

  public setCountDate(countDate:string){
    this.countDate = countDate;
  }

  public getCountTime(){
    return this.countTime;
  }

  public setCountTime(countTime:string){
    this.countTime = countTime;
  }

  public getCountAmount(){
    return this.countAmount;
  }

  public setCountAmount(countAmount:string){
    this.countAmount = countAmount;
  }
}