import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Match } from '../model/Match';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  constructor(private readonly http: HttpClient) {}

  createMatch(match: Match): Observable<Match> {
    return this.http.post<Match>(environment.apiResources.matches.matches(), match);
  }
}
