import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MovieResponse } from '../models/Movie';

@Injectable({
  providedIn: 'root',
})
export class DiscoverMovieService {
  API_URL = environment.apiUrl;
  API_KEY = environment.apiKey;

  constructor(private http: HttpClient) {}

  getDiscoverMovies(page: number) {
    const params = {
      api_key: this.API_KEY,
      // include_adult: true,
      language: 'es-MX',
      page: page.toString(),
    };
    return this.http.get<MovieResponse>(`${this.API_URL}discover/movie`, {
      params,
    });
  }
}
