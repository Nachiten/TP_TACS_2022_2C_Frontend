export class Match {
  id: number;
  date: Date;
  time: Date;
  location: string;

  constructor() {
    this.id = 0;
    this.date = new Date();
    this.time = new Date();
    this.location = '';
  }
}
