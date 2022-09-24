import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HealthService {
  constructor(private readonly http: HttpClient) {}

  getHealth() {
    return this.http.get(environment.apiResources.test.getHealth());
  }
}
