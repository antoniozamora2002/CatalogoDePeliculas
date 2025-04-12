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
  searchQuery = '';
  searchResults: MovieResponse = {} as MovieResponse;
  isLoading = false;
  currentYear = new Date().getFullYear();

  totalPages = 1;

  constructor(
    private searchMovieService: SearchMovieService,
    private detailsMovieService: DetailsMovieService,
    private router: Router
  ) {
    // Initialize the search results
    this.searchQuery = this.searchMovieService.searchQuery();
    if (this.searchQuery) {
      this.loadMoviesResponse();
    }
  }

  loadMoviesResponse(): void {
    this.isLoading = true;
    this.searchMovieService
      .getSearchMovies(this.searchMovieService.searchQuery(), this.totalPages)
      .subscribe({
        next: (response: MovieResponse) => {
          this.searchResults = response;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error al buscar películas:', error);
          this.isLoading = false;
        },
      });
  }

  searchMovies(): void {
    if (!this.searchQuery.trim()) return;

    this.searchMovieService.searchQuery.set(this.searchQuery); // Update the search query in the service
    this.totalPages = 1; // Reset to the first page
    this.loadMoviesResponse(); // Load the movies based on the search query
  }

  viewMovieDetails(movieId: number): void {
    // Navigate to movie details page
    this.router.navigate(['/details']);
    this.detailsMovieService.movieId.set(movieId); // Guardamos el ID de la película en el servicio
  }

  homePage(): void {
    this.router.navigate(['/']);
  }

  changePage(page: number): void {
    if (page === this.totalPages) return;

    this.totalPages = page;
    this.scrollToTop();
    this.loadMoviesResponse();
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
