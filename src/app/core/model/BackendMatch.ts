export class BackendMatch {
  id?: number;
  startingDate: string;
  startingTime: string;
  location: string;

  constructor() {
    this.id = 0;
    this.startingDate = '';
    this.startingTime = '';
    this.location = '';
  }
}
