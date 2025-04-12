import { Component, inject, OnInit } from '@angular/core';
import { Movie, MovieResponse } from '../../models/Movie';
import { DiscoverMovieService } from '../../services/discover-movie.service';
import { Title } from '@angular/platform-browser';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { DetailsMovieService } from '../../services/details-movie.service';
import { FormsModule } from '@angular/forms';
import { SearchMovieService } from '../../services/search-movie.service';

@Component({
  selector: 'app-home',
  imports: [DecimalPipe, DatePipe, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private detailsMovieService = inject(DetailsMovieService);
  private searchMovieService = inject(SearchMovieService);

  movies: Movie[] = [];
  currentPage = 1;
  totalPages = 1;
  isLoading = true;
  currentYear = new Date().getFullYear();

  searchQuery = '';

  title = 'Catálogo de Películas';

  constructor(
    private discoverMovies: DiscoverMovieService,
    private titleService: Title,
    private router: Router
  ) {
    this.titleService.setTitle(this.title);
  }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.isLoading = true;
    this.discoverMovies
      .getDiscoverMovies(this.currentPage)
      .subscribe((response: MovieResponse) => {
        this.movies = response.results;
        this.totalPages = response.total_pages;
        this.isLoading = false;
      });
  }

  // Metodo para buscar películas
  searchMovies(): void {
    if (!this.searchQuery.trim()) return;

    this.searchMovieService.searchQuery.set(this.searchQuery);
    this.router.navigate(['/search']);
  }

  // Metodo para ver detalle de la película
  viewMovieDetails(movieId: number): void {
    this.router.navigate(['/details']);
    this.detailsMovieService.movieId.set(movieId);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadMovies();
      this.scrollToTop();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadMovies();
      this.scrollToTop();
    }
  }

  goToPage(page: number): void {
    if (page !== this.currentPage && page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadMovies();
      this.scrollToTop();
    }
  }

  getPaginationArray(): number[] {
    const maxVisiblePages = 5;
    const pages: number[] = [];

    let startPage = Math.max(
      1,
      this.currentPage - Math.floor(maxVisiblePages / 2)
    );
    const endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

    // Ajustar si estamos cerca del final
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
