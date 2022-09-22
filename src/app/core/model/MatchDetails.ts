import { Player } from "./Player";

export interface MatchDetails {
  startingDateTime: string;
  location: string;
  players: Player[];
}
