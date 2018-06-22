import { Component, OnInit } from '@angular/core';

import { ImageSearchService } from '../services/image-search.service';
import { default as default_response } from '../default_response.json';

@Component({
  selector: 'app-image-search',
  templateUrl: './image-search.component.html',
  styleUrls: ['./image-search.component.css']
})
export class ImageSearchComponent implements OnInit {

  allCategory = default_response.SearchItemResponse.picInfo.allCategory;
  catId: string;

  constructor(
    private imageSearchService: ImageSearchService
  ) { }

  onchange(files: FileList, cat_id: string) {
    this.imageSearchService.postPictures(files, cat_id);
  }

  ngOnInit(): void {
    this.imageSearchService.catId$.subscribe((_) => {
      this.catId = _;
    });
    this.catId = '';
  }

}
