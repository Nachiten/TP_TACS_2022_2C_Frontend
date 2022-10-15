import { Player } from './Player';

export class Match {
  id: string;
  dateTime: Date;
  location: string;
  players: Player[];

  constructor() {
    this.id = '';
    this.dateTime = new Date();
    this.location = '';
    this.players = [];
  }
}
