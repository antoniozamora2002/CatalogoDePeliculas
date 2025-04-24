import { Routes } from '@angular/router';
import { DetailsMovieComponent } from './features/components/details-movie/details-movie.component';
import { HomeComponent } from './core/components/home/home.component';
import { SearchMovieComponent } from './features/components/search-movie/search-movie.component';
import { PersonComponent } from './features/components/person/person.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'details', component: DetailsMovieComponent },
  { path: 'search', component: SearchMovieComponent },
  { path: 'person', component: PersonComponent },
];
