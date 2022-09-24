import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { PlayersStatistics } from '../model/PlayersStatistics';
import { MatchesStatistics } from '../model/MatchesStatistics';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  constructor(private readonly http: HttpClient) {}

  getPlayerStatistics(hours: number): Observable<PlayersStatistics> {
    return this.http.get<PlayersStatistics>(
      environment.apiResources.statistics.statisticsPlayers(),
      {
        params: {
          hours
        }
      }
    );
  }

  getMatchStatistics(hours: number): Observable<MatchesStatistics> {
    return this.http.get<MatchesStatistics>(
      environment.apiResources.statistics.statisticsMatches(),
      {
        params: {
          hours
        }
      }
    );
  }
}
