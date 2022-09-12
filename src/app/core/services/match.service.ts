import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Match } from '../model/Match';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BackendMatch } from '../model/BackendMatch';
import { dateToBackendDateTime } from '../../utils/service-utils';

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
}
