import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { DetailsMovieService } from '../../core/services/details-movie.service';
import { DatePipe, DecimalPipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-details-movie',
  imports: [DatePipe, DecimalPipe, UpperCasePipe],
  templateUrl: './details-movie.component.html',
  styleUrl: './details-movie.component.css',
})
export class DetailsMovieComponent implements OnInit, OnDestroy {
  private detailsMovieService = inject(DetailsMovieService);
  movie: any = {};

  constructor() {}

  ngOnInit(): void {
    // Initialization logic here
    this.loadDetailsMovie();
  }

  ngOnDestroy(): void {
    // Cleanup logic here
  }

  loadDetailsMovie() {
    let movieId = this.detailsMovieService.movieId();

    if (!movieId) {
      // Intentar recuperar el ID desde el almacenamiento local
      const storedMovieId = localStorage.getItem('movieId');
      movieId = storedMovieId ? Number(storedMovieId) : null;

      if (!movieId) {
        console.error('El ID de la película es nulo o indefinido.');
        return;
      }
    } else {
      // Guardar el ID en el almacenamiento local como cadena
      localStorage.setItem('movieId', movieId.toString());
    }

    this.detailsMovieService.getDetailsMovie(movieId).subscribe({
      next: (response) => {
        console.log('Detalles de la película:', response);
        this.movie = response;
      },
      error: (error) => {
        console.error('Error al cargar los detalles de la película:', error);
      },
    });
  }
}
