import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BackendPlayer } from '../model/BackendPlayer';
import { Player } from '../model/Player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  constructor(private readonly http: HttpClient) {}

  createPlayer(player: Player): Observable<Player> {
    const backendPlayer = new BackendPlayer();

    delete backendPlayer.id;

    backendPlayer.matchId = player.matchId;
    backendPlayer.userPhoneNumber = player.userPhoneNumber;
    backendPlayer.userEmail = player.userEmail;

    return this.http.post<Player>(environment.apiResources.players.players(), backendPlayer);
  }
}
