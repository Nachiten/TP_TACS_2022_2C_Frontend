export class Match {
  id: number;
  dateTime: Date;
  location: string;

  constructor() {
    this.id = 0;
    this.dateTime = new Date();
    this.location = '';
  }
}
