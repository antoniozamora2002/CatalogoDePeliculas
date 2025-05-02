import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Actor } from '../models/Person';
import { MovieCredits } from '../models/PersonMovieCredits';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  personId = signal<number | 0>(0);

  API_URL_PEOPLE = environment.apiUrl + 'person/';
  API_KEY = environment.apiKey;

  constructor(private http: HttpClient) {}

  getDetailsPerson(id: number): Observable<Actor> {
    const params = {
      api_key: this.API_KEY,
    };
    return this.http.get<Actor>(`${this.API_URL_PEOPLE}${id}`, { params });
  }

  getPersonMovieCredits(id: number): Observable<MovieCredits> {
    const params = {
      api_key: this.API_KEY,
      language: 'es-MX',
    };
    return this.http.get<MovieCredits>(
      `${this.API_URL_PEOPLE}${id}/movie_credits`,
      {
        params,
      }
    );
  }
}
