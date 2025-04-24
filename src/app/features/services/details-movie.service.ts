import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { DetailsMovieResponse } from '../models/DetailsMovie';
import { CreditsMovieResponse } from '../models/CreditsMovie';
import { VideoResponse } from '../models/VideosMovie';

@Injectable({
  providedIn: 'root',
})
export class DetailsMovieService {
  movieId = signal<number | null>(null);

  API_URL_DETAILS_MOVIE = environment.apiUrl + 'movie/';
  API_KEY = environment.apiKey;

  constructor(private http: HttpClient) {}

  getDetailsMovie(id: number): Observable<DetailsMovieResponse> {
    const params = {
      api_key: this.API_KEY,
      language: 'es-MX',
    };
    return this.http.get<DetailsMovieResponse>(
      `${this.API_URL_DETAILS_MOVIE}${id}`,
      { params }
    );
  }

  getCreditsMovie(id: number): Observable<CreditsMovieResponse> {
    const params = {
      api_key: this.API_KEY,
      language: 'es-MX',
    };
    return this.http.get<CreditsMovieResponse>(
      `${this.API_URL_DETAILS_MOVIE}${id}/credits`,
      {
        params,
      }
    );
  }

  getVideosMovie(id: number): Observable<VideoResponse> {
    const params = {
      api_key: this.API_KEY,
      language: 'es-MX',
    };
    return this.http.get<VideoResponse>(
      `${this.API_URL_DETAILS_MOVIE}${id}/videos`,
      {
        params,
      }
    );
  }
}
