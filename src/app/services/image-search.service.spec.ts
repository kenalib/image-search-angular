import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ImageSearchService } from './image-search.service';

describe('ImageSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageSearchService],
      imports: [ HttpClientModule ]
    });
  });

  it('should be created', inject([ImageSearchService], (service: ImageSearchService) => {
    expect(service).toBeTruthy();
  }));
});
