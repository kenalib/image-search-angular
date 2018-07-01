import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ImageSearchService } from '../services/image-search.service';
import { Picture } from '../models/picture';

declare function require(url: string);
const default_response = require('../default_response.json');

@Component({
  selector: 'app-image-search',
  templateUrl: './image-search.component.html',
  styleUrls: ['./image-search.component.css']
})
export class ImageSearchComponent implements OnInit {

  allCategory = default_response.SearchItemResponse.picInfo.allCategory;

  pictures$: Observable<Picture[]>;
  catId: string;
  previewImg: string;

  constructor(
    private imageSearchService: ImageSearchService
  ) { }

  ngOnInit(): void {
    this.pictures$ = this.imageSearchService.getPictures();
  }

  onDragOver(event) {
    event.preventDefault();
  }

  onDrop(event) {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer.files;

    this.onchange(files);
  }

  onchange(files: FileList) {
    if (files.length > 0) {
      this.readPreview(files[0]);
    }

    if (this.catId === undefined) {
      this.catId = '';
    }

    this.pictures$ = this.imageSearchService.postPictures(files, this.catId)
      .pipe(
        tap(res => {
          if (res.length > 0) {
            this.catId = res[0].catId;
          }
        })
      );
  }

  readPreview(file) {
    const reader  = new FileReader();

    reader.onloadend = () => {
      this.previewImg = reader.result;
    };

    reader.readAsDataURL(file);
  }

}
