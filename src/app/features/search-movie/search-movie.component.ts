import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchMovieService } from '../../core/services/search-movie.service';
import { MovieResponse } from '../../core/models/Movie';
import { DetailsMovieService } from '../../core/services/details-movie.service';
import { Router } from '@angular/router';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { Title } from '@angular/platform-browser';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';

@Component({
  selector: 'app-search-movie',
  imports: [
    CommonModule,
    FormsModule,
    FooterComponent,
    PaginationComponent,
    SearchBarComponent,
  ],
  templateUrl: './search-movie.component.html',
  styleUrl: './search-movie.component.css',
})
export class SearchMovieComponent {
  searchQuery = '';
  searchResults: MovieResponse = {} as MovieResponse;
  isLoading = false;
  currentPage = 1;
  totalPages = 1;

  constructor(
    private searchMovieService: SearchMovieService,
    private detailsMovieService: DetailsMovieService,
    private titleService: Title,
    private router: Router
  ) {
    // Initialize the search results
    this.searchQuery = this.searchMovieService.searchQuery();
    if (this.searchQuery) {
      this.loadMoviesResponse();
      this.titleService.setTitle('Buscando: ' + this.searchQuery);
    }
  }

  loadMoviesResponse(): void {
    this.isLoading = true;
    this.searchMovieService
      .getSearchMovies(this.searchMovieService.searchQuery(), this.currentPage)
      .subscribe({
        next: (response: MovieResponse) => {
          this.searchResults = response;
          this.totalPages = response.total_pages;
          this.currentPage = response.page;
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
    this.currentPage = 1; // Reset to the first page
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

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadMoviesResponse();
      this.scrollToTop();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadMoviesResponse();
      this.scrollToTop();
    }
  }

  goToPage(page: number): void {
    if (page !== this.currentPage && page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadMoviesResponse();
      this.scrollToTop();
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
