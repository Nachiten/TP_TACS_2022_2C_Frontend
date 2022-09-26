export class PlayerStatistics {
  playersEnrolled: number;
  now: Date;

  constructor() {
    this.playersEnrolled = 0;
    this.now = new Date();
  }
}
