import { Routes } from '@angular/router';
import { DetailsMovieComponent } from './features/details-movie/details-movie.component';
import { HomeComponent } from './core/components/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'details', component: DetailsMovieComponent },
];
