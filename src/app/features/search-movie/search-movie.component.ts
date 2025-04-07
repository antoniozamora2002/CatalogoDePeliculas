import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchMovieService } from '../../core/services/search-movie.service';
import { Movie, MovieResponse } from '../../core/models/Movie';
import { DetailsMovieService } from '../../core/services/details-movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-movie',
  imports: [CommonModule, FormsModule],
  templateUrl: './search-movie.component.html',
  styleUrl: './search-movie.component.css',
})
export class SearchMovieComponent {
  searchQuery: string = '';
  searchResults!: MovieResponse;

  totalPages: number = 1;

  constructor(
    private searchMovieService: SearchMovieService,
    private detailsMovieService: DetailsMovieService,
    private router: Router
  ) {
    // Initialize the search results
    this.searchQuery = this.searchMovieService.searchQuery();
    this.loadMoviesResponse();
  }

  loadMoviesResponse(): void {
    console.log('SearchMovies:', this.searchMovieService.searchQuery());
    console.log('Total Pages:', this.totalPages);
    this.searchMovieService
      .getSearchMovies(this.searchMovieService.searchQuery(), this.totalPages)
      .subscribe((response: MovieResponse) => {
        console.log('SearchMovies:', response);
        this.searchResults = response;
      });
  }

  searchMovies(): void {
    console.log(`Searching for: ${this.searchQuery}`);
    this.searchMovieService.searchQuery.set(this.searchQuery); // Update the search query in the service
    this.totalPages = 1; // Reset to the first page

    this.loadMoviesResponse(); // Load the movies based on the search query
  }

  viewMovieDetails(movieId: number): void {
    // Navigate to movie details page
    console.log(`Viewing details for movie ID: ${movieId}`);
    this.router.navigate(['/details']);
    this.detailsMovieService.movieId.set(movieId); // Guardamos el ID de la película en el servicio
  }

  changePage(page: number): void {
    // In a real application, this would fetch the specified page from the API
    console.log(`Changing to page: ${page}`);

    // For demo purposes, just update the page number
    this.totalPages = page;
    this.loadMoviesResponse();
  }
}
