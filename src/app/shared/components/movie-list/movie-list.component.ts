import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from '../../../core/models/Movie';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-list',
  imports: [CommonModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
})
export class MovieListComponent {
  @Input() movies: Movie[] = [];
  @Input() isLoading: boolean = false;

  @Output() movieClick = new EventEmitter<number>();

  viewMovieDetails(movieId: number): void {
    this.movieClick.emit(movieId);
  }
}
