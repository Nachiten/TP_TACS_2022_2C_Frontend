import { Player } from './Player';

export class BackendMatch {
  id?: number;
  startingDateTime: string;
  location: string;
  players: Player[];

  constructor() {
    this.id = 0;
    this.startingDateTime = '';
    this.location = '';
    this.players = [];
  }
}
