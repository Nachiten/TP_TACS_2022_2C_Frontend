import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';
import { PlayerStatistics } from '../model/PlayerStatistics';
import { MatchStatistics } from '../model/MatchStatistics';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  constructor(private readonly http: HttpClient) {}

  getPlayerStatistics(hours: number): Observable<PlayerStatistics> {
    return this.http
      .get<PlayerStatistics>(environment.apiResources.statistics.statisticsPlayers(), {
        params: {
          hours
        }
      })
      .pipe(
        map((playerStats: PlayerStatistics) => {
          playerStats.now = new Date(playerStats.now);

          return playerStats;
        })
      );
  }

  getMatchStatistics(hours: number): Observable<MatchStatistics> {
    return this.http
      .get<MatchStatistics>(environment.apiResources.statistics.statisticsMatches(), {
        params: {
          hours
        }
      })
      .pipe(
        map((matchStats: MatchStatistics) => {
          matchStats.now = new Date(matchStats.now);

          return matchStats;
        })
      );
  }
}
