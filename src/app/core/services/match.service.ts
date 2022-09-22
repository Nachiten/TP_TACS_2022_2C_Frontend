import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Match } from '../model/Match';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BackendMatch } from '../model/BackendMatch';
import { dateToBackendDateTime } from '../../utils/service-utils';
import { Player } from '../model/Player';
import { BackendPlayer } from '../model/BackendPlayer';
import { of } from 'rxjs'; //TODO: borrar

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

  //TODO: cambiar tipo 'any'
  getMatchById(matchId: string): Observable<any> {
    //const url = environment.apiResources.matches.matchById(matchId)
    //return this.http.get(url)
    return this.getMatchDetailsMock()
  }

  //TODO: Borrar mock
  getMatchDetailsMock(): Observable<any> {
    return of({
      id: "01GDH653FFZFTQN2SHFJSD8MDJ",
      creationDate: "2022-09-21T20:29:28.373",
      startingDateTime: "2023-09-17T21:18:00",
      location: "HLE",
      players: [
        {
          creationDate: "2022-09-21T20:41:29.837",
          matchId: "01GDH653FFZFTQN2SHFJSD8MDJ",
          phoneNumber: 11111111111,
          email: "1111@gmail.com",
          isRegular: true
        },
        {
          creationDate: "2022-09-21T20:41:41.841",
          matchId: "01GDH653FFZFTQN2SHFJSD8MDJ",
          phoneNumber: 222222222,
          email: "2222@gmail.com",
          isRegular: true
        },
        {
          creationDate: "2022-09-21T20:41:50.262",
          matchId: "01GDH653FFZFTQN2SHFJSD8MDJ",
          phoneNumber: 333333,
          email: "33333@gmail.com",
          isRegular: true
        },
        {
          creationDate: "2022-09-21T20:41:55.808",
          matchId: "01GDH653FFZFTQN2SHFJSD8MDJ",
          phoneNumber: 4444444,
          email: "444444@gmail.com",
          isRegular: true
        },
        {
          creationDate: "2022-09-21T20:41:55.808",
          matchId: "01GDH653FFZFTQN2SHFJSD8MDJ",
          phoneNumber: 555555,
          email: "5@gmail.com",
          isRegular: true
        },
        {
          creationDate: "2022-09-21T20:41:55.808",
          matchId: "01GDH653FFZFTQN2SHFJSD8MDJ",
          phoneNumber: 666666,
          email: "6@gmail.com",
          isRegular: true
        },
        {
          creationDate: "2022-09-21T20:41:55.808",
          matchId: "01GDH653FFZFTQN2SHFJSD8MDJ",
          phoneNumber: 777777,
          email: "7@gmail.com",
          isRegular: true
        },
        {
          creationDate: "2022-09-21T20:41:55.808",
          matchId: "01GDH653FFZFTQN2SHFJSD8MDJ",
          phoneNumber: 888888,
          email: "8@gmail.com",
          isRegular: true
        },
        {
          creationDate: "2022-09-21T20:41:55.808",
          matchId: "01GDH653FFZFTQN2SHFJSD8MDJ",
          phoneNumber: 999999,
          email: "9@gmail.com",
          isRegular: true
        },
        {
          creationDate: "2022-09-21T20:41:55.808",
          matchId: "01GDH653FFZFTQN2SHFJSD8MDJ",
          phoneNumber: 10101010,
          email: "10@gmail.com",
          isRegular: true
        },
        {
          creationDate: "2022-09-21T20:41:55.808",
          matchId: "01GDH653FFZFTQN2SHFJSD8MDJ",
          phoneNumber: 11111111,
          email: "11@gmail.com",
          isRegular: false
        },
        {
          creationDate: "2022-09-21T20:41:55.808",
          matchId: "01GDH653FFZFTQN2SHFJSD8MDJ",
          phoneNumber: 12121212,
          email: "12@gmail.com",
          isRegular: false
        }
      ]
    })
  }
}
