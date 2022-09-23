import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Match } from '../model/Match';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BackendMatch } from '../model/BackendMatch';
import { dateToBackendDateTime } from '../../utils/date-utils';
import { Player } from '../model/Player';
import { BackendPlayer } from '../model/BackendPlayer';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  constructor(private readonly http: HttpClient) {}

  createMatch(match: Match): Observable<Match> {
    const backendMatch = new BackendMatch();

    delete backendMatch.id;

    backendMatch.startingDateTime = dateToBackendDateTime(match.dateTime);
    backendMatch.location = match.location;

    return this.http.post<Match>(environment.apiResources.matches.matches(), backendMatch);
  }

  createPlayer(player: Player): Observable<Player> {
    const backendPlayer = new BackendPlayer();

    backendPlayer.phoneNumber = player.phoneNumber;
    backendPlayer.email = player.email;

    return this.http.post<Player>(
      environment.apiResources.matches.matchPlayers(player.matchId),
      backendPlayer
    );
  }

  getMatchById(matchId: string): Observable<Match> {
    return this.http.get<BackendMatch>(environment.apiResources.matches.matchById(matchId)).pipe(
      map((backMatch: BackendMatch) => {
        const frontMatch = new Match();

        frontMatch.id = backMatch.id as number;
        frontMatch.location = backMatch.location;
        frontMatch.players = backMatch.players;
        frontMatch.dateTime = new Date(backMatch.startingDateTime);

        // Compensation for time zone difference
        frontMatch.dateTime.setHours(frontMatch.dateTime.getHours() - 3);

        return frontMatch;
      })
    );
  }
}
