import { Player } from './Player';

export class Match {
  id: number;
  dateTime: Date;
  location: string;
  players: Player[];

  constructor() {
    this.id = 0;
    this.dateTime = new Date();
    this.location = '';
    this.players = [];
  }
}
