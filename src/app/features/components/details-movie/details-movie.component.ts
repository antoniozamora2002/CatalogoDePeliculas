import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { DetailsMovieService } from '../../services/details-movie.service';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DetailsMovieResponse } from '../../models/DetailsMovie';
import { CreditsMovieResponse } from '../../models/CreditsMovie';
import { PersonService } from '../../services/person.service';
import { VideoResponse } from '../../models/VideosMovie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details-movie',
  imports: [DatePipe, UpperCasePipe],
  templateUrl: './details-movie.component.html',
  styleUrl: './details-movie.component.css',
})
export class DetailsMovieComponent implements OnInit, OnDestroy {
  private detailsMovieService = inject(DetailsMovieService);
  private personService = inject(PersonService);
  private sanitizer = inject(DomSanitizer);

  movie: any = {};
  cast: any[] = [];
  movieVideos: { name: string; url: SafeResourceUrl }[] = [];

  loading = true;

  constructor(private router: Router) {}

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
      next: (response: DetailsMovieResponse) => {
        // console.log('getDetailsMovie:', response);
        this.movie = response;
        this.loading = false;
        // console.log('Movie ID:', movieId);
      },
      error: (error) => {
        console.error('Error al cargar los detalles de la película:', error);
      },
    });

    this.detailsMovieService.getCreditsMovie(movieId).subscribe({
      next: (response: CreditsMovieResponse) => {
        // console.log('getCreditsMovie:', response);
        this.cast = response.cast.slice(0, 10); // Limitar a los primeros 10 actores
      },
      error: (error) => {
        console.error('Error al cargar los detalles de la película:', error);
      },
    });

    this.detailsMovieService.getVideosMovie(movieId).subscribe({
      next: (response: VideoResponse) => {
        // console.log('getVideosMovie', response);
        this.movieVideos = response.results.map((video: any) => ({
          name: video.name,
          url: this.sanitizer.bypassSecurityTrustResourceUrl(
            `https://www.youtube.com/embed/${video.key}`
          ),
        }));
      },
      error: (error) => {
        console.error('Error al cargar los videos de la película:', error);
      },
    });
  }

  selectActor(actorId: number): void {
    this.personService.personId.set(actorId);
    console.log('Actor seleccionado con ID:', actorId);
    this.router.navigate(['/person']);
  }
}
