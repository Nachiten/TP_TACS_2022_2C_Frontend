export class Player {
  phoneNumber: number;
  email: string;
  matchId: string;
  isRegular: boolean;

  constructor() {
    this.phoneNumber = 0;
    this.email = '';
    this.matchId = '';
    this.isRegular = false;
  }
}
