import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';

import { PicturesComponent } from './pictures.component';
import { Picture } from '../models/picture';

declare function require(url: string);
const default_response = require('../default_response.json');

describe('PicturesComponent', () => {
  let component: PicturesComponent;
  let fixture: ComponentFixture<PicturesComponent>;
  let pictures$: Observable<Picture[]>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PicturesComponent
      ],
      imports: [
        MatCardModule,
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PicturesComponent);
    component = fixture.componentInstance;
    pictures$ = of(default_response.SearchItemResponse.auctions);
    component.pictures$ = pictures$;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the first picture title', () => {
    const de = fixture.debugElement.queryAll(By.css('mat-card-title'));

    expect(de[0].nativeElement.textContent).toMatch(/bag02.jpg/);
  });
});
