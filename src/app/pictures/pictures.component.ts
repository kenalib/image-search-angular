import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Picture } from '../models/picture';
import { ImageSearchService } from '../services/image-search.service';

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.css']
})
export class PicturesComponent implements OnInit {

  pictures$: Observable<Picture[]>;
  OSS_URL = 'http://image-search-demo2.oss-ap-southeast-1.aliyuncs.com/image_search_pictures/';

  constructor(
    private imageSearchService: ImageSearchService
  ) { }

  ngOnInit() {
    this.pictures$ = this.imageSearchService.pictures$;
    this.imageSearchService.getPictures();
  }

}
