import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchMovieService } from '../../core/services/search-movie.service';
import { MovieResponse } from '../../core/models/Movie';
import { DetailsMovieService } from '../../core/services/details-movie.service';
import { ActivatedRoute, Router } from '@angular/router';
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
export class SearchMovieComponent implements OnInit {
  searchQuery = '';
  searchResults: MovieResponse = {
    page: 1,
    results: [],
    total_pages: 0,
    total_results: 0,
  };

  currentPage = 1;
  totalPages = 1;

  constructor(
    private searchMovieService: SearchMovieService,
    private detailsMovieService: DetailsMovieService,
    private titleService: Title,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Leer parámetros de URL
    this.route.queryParams.subscribe((params) => {
      if (params['query']) {
        this.searchQuery = params['query'];
        this.searchMovieService.searchQuery.set(this.searchQuery);

        if (params['page']) {
          this.currentPage = +params['page'];
        } else {
          this.currentPage = 1;
        }

        this.loadMoviesResponse();
        this.titleService.setTitle('Buscando: ' + this.searchQuery);
      }
    });
  }

  loadMoviesResponse(): void {
    this.searchMovieService
      .getSearchMovies(this.searchMovieService.searchQuery(), this.currentPage)
      .subscribe({
        next: (response: MovieResponse) => {
          this.searchResults = response;
          this.totalPages = response.total_pages;
          this.currentPage = response.page;
        },
        error: (error) => {
          console.error('Error al buscar películas:', error);
        },
      });
  }

  searchMovies(): void {
    if (!this.searchQuery.trim()) return;

    this.searchMovieService.searchQuery.set(this.searchQuery);
    this.currentPage = 1;

    // Actualizar URL con los parámetros de búsqueda
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { query: this.searchQuery, page: this.currentPage },
      queryParamsHandling: 'merge',
    });

    this.loadMoviesResponse();
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

      // Actualizar URL con la nueva página
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: this.currentPage },
        queryParamsHandling: 'merge',
      });

      this.loadMoviesResponse();
      this.scrollToTop();
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
