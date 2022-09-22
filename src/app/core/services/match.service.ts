import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Match } from '../model/Match';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BackendMatch } from '../model/BackendMatch';
import { dateToBackendDateTime } from '../../utils/service-utils';
import { Player } from '../model/Player';
import { BackendPlayer } from '../model/BackendPlayer';
import { MatchDetails } from '../model/MatchDetails';

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
      environment.apiResources.matches.playersByMatch(player.matchId),
      backendPlayer
    );
  }

  getMatchById(matchId: string): Observable<MatchDetails> {
    const url = environment.apiResources.matches.matchById(matchId)
    return this.http.get<MatchDetails>(url)
  }

}
