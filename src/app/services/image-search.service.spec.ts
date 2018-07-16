import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';

import { ImageSearchService } from './image-search.service';
import { Picture } from '../models/picture';
import { environment } from '../../environments/environment';

declare function require(url: string);
const default_response = require('../default_response.json');
const imageSearchUrl = environment.image_search_url;

describe('ImageSearchService', () => {
  let injector: TestBed;
  let service: ImageSearchService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ ImageSearchService ],
      imports: [ HttpClientTestingModule ]
    });

    injector = getTestBed();
    service = injector.get(ImageSearchService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', inject([ImageSearchService], (service_: ImageSearchService) => {
    expect(service_).toBeTruthy();
  }));

  it('should test get image search', () => {
    const dummyData: Observable<Picture[]> = of(default_response.SearchItemResponse.auctions);

    service.getPictures().subscribe((pictures: Picture[]) => {
      expect(pictures.length).toEqual(5);
      expect(pictures).toEqual(default_response.SearchItemResponse.auctions);
    });

    const req = httpMock.expectOne(imageSearchUrl);

    expect(req.request.method).toEqual('GET');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');

    req.flush(dummyData);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpMock.verify();
  });
});
