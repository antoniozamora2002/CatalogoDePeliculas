import { Component, inject, OnInit } from '@angular/core';
import { Movie, MovieResponse } from '../../models/Movie';
import { DiscoverMovieService } from '../../services/discover-movie.service';
import { Title } from '@angular/platform-browser';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { DetailsMovieService } from '../../services/details-movie.service';
import { FormsModule } from '@angular/forms';
import { SearchMovieService } from '../../services/search-movie.service';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';

@Component({
  selector: 'app-home',
  imports: [
    DecimalPipe,
    DatePipe,
    CommonModule,
    FormsModule,
    FooterComponent,
    PaginationComponent,
    SearchBarComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private detailsMovieService = inject(DetailsMovieService);
  private searchMovieService = inject(SearchMovieService);

  movies: Movie[] = [];
  currentPage = 1;
  totalPages = 1;

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
    this.discoverMovies
      .getDiscoverMovies(this.currentPage)
      .subscribe((response: MovieResponse) => {
        this.movies = response.results;
        this.totalPages = response.total_pages;
      });
  }

  // Método para buscar películas
  searchMovies(query?: string): void {
    // Si recibimos un query del componente hijo, lo usamos
    if (query) {
      this.searchQuery = query;
    }

    if (!this.searchQuery.trim()) return;

    // Guardar la consulta en el servicio
    this.searchMovieService.searchQuery.set(this.searchQuery);

    // Navegar a la página de búsqueda con el parámetro query en la URL
    this.router.navigate(['/search'], {
      queryParams: {
        query: this.searchQuery,
        page: 1,
      },
    });
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

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
