import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { Picture } from '../models/picture';

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.css']
})
export class PicturesComponent {

  @Input() pictures$: Observable<Picture[]>;
  OSS_URL = 'http://image-search-demo2.oss-ap-southeast-1.aliyuncs.com/image_search_pictures/';

  constructor() { }

}
