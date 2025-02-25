import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DiscoverMovieService } from './core/services/discover-movie.service';
import { Movie, MovieResponse } from './core/models/Movie';
import { DatePipe, DecimalPipe } from '@angular/common';
import { delay } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DecimalPipe, DatePipe],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // discoverMovies = inject(DiscoverMovieService);
  movies: Movie[] = [];
  currentPage = 1;
  totalPages = 1;

  title = 'Catálogo de Películas';

  constructor(private discoverMovies: DiscoverMovieService, private titleService: Title) {
    this.titleService.setTitle(this.title);
  }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.discoverMovies.getDiscoverMovies(this.currentPage).pipe(delay(500)).subscribe((data: MovieResponse) => {
      this.movies = data.results;
      this.totalPages = data.total_pages; // 👈 Aquí usamos el total de páginas de la API
      console.log(`Página ${this.currentPage} de ${this.totalPages}`, this.movies);
    });
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
