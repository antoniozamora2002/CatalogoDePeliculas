import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SearchMovieService {
  searchQuery = signal<string>('');

  API_URL_SEARCH_MOVIE = environment.apiUrl + 'search/movie';
  API_KEY = environment.apiKey;

  constructor(private http: HttpClient) {}

  getSearchMovies(query: string, page: number) {
    const params = {
      api_key: this.API_KEY,
      language: 'es-MX',
      query: query,
      page: page,
      // include_adult: true,
    };
    return this.http.get<any>(this.API_URL_SEARCH_MOVIE, { params });
  }
}
