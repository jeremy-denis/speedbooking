export class Run {
  _id: number;
  id: number;
  time:number;
  max:number;
  tours:any;
  persons:any;
  launch:boolean;
  
  constructor(private num, private tim) {
    this.id = num;
    this.time = tim;
  }
}
