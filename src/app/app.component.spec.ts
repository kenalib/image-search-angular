import { TestBed, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ImageSearchComponent } from './image-search/image-search.component';
import { PicturesComponent } from './pictures/pictures.component';
import { MessagesComponent } from './messages/messages.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        PicturesComponent,
        MessagesComponent,
        ImageSearchComponent
      ],
      imports: [
        BrowserAnimationsModule,
        MatSelectModule,
        MatCardModule,
        MatIconModule,
        HttpClientModule,
        FormsModule
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Image Search Demo');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const comp = fixture.componentInstance;

    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Image Search Demo');

    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('h1'));
    const h1 = de.nativeElement;
    expect(h1.innerText).toMatch(/Image Search Demo/);

    comp.title = 'Javascript';
    fixture.detectChanges();
    const h1x = de.nativeElement;
    expect(h1x.innerText).toMatch(/javascript/i);

  }));
});
