import { TestBed } from '@angular/core/testing';

import { DetailsMovieService } from './details-movie.service';

describe('DetailsMovieService', () => {
  let service: DetailsMovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailsMovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
