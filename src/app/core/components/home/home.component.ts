import { Component, inject, OnInit } from '@angular/core';
import { Movie, MovieResponse } from '../../models/Movie';
import { DiscoverMovieService } from '../../services/discover-movie.service';
import { Title } from '@angular/platform-browser';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { DetailsMovieService } from '../../services/details-movie.service';

@Component({
  selector: 'app-home',
  imports: [DecimalPipe, DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private detailsMovieService = inject(DetailsMovieService);

  movies: Movie[] = [];
  currentPage = 1;
  totalPages = 1;

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
        console.log('DiscoverMovies:', response);
        this.movies = response.results;
        this.totalPages = response.total_pages; // Aquí usamos el total de páginas de la API
        // console.log(
        //   `Página ${this.currentPage} de ${this.totalPages}`,
        //   this.movies
        // );
      });
  }

  // Metodo para ver detalle de la película
  viewMovieDetails(movieId: number): void {
    this.router.navigate(['/details']);
    this.detailsMovieService.movieId.set(movieId); // Guardamos el ID de la película en el servicio
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadMovies();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadMovies();
    }
  }
}
