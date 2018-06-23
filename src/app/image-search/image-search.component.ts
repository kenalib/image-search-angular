import { Component, OnInit } from '@angular/core';

import { ImageSearchService } from '../services/image-search.service';

declare function require(url: string);
const default_response = require('../default_response.json');

@Component({
  selector: 'app-image-search',
  templateUrl: './image-search.component.html',
  styleUrls: ['./image-search.component.css']
})
export class ImageSearchComponent implements OnInit {

  allCategory = default_response.SearchItemResponse.picInfo.allCategory;
  catId: string;
  previewImg: string;

  constructor(
    private imageSearchService: ImageSearchService
  ) { }

  onchange(files: FileList, cat_id: string) {
    if (files[0]) {
      const reader  = new FileReader();

      reader.onloadend = () => {
        this.previewImg = reader.result;
      };

      reader.readAsDataURL(files[0]);
    }
    this.imageSearchService.postPictures(files, cat_id);
  }

  ngOnInit(): void {
    this.imageSearchService.catId$.subscribe((_) => {
      this.catId = _;
    });
    this.catId = '';
  }

}
