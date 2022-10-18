import { Player } from './Player';

export class BackendMatch {
  id?: string;
  startingDateTime: string;
  location: string;
  players: Player[];

  constructor() {
    this.id = '';
    this.startingDateTime = '';
    this.location = '';
    this.players = [];
  }
}
