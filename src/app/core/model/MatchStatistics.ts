export class MatchStatistics {
  matchesCreated: number;
  now: Date;

  constructor() {
    this.matchesCreated = 0;
    this.now = new Date();
  }
}
