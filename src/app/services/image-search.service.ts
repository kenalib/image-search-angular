import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Picture } from '../models/picture';
import { SearchItemResponse } from '../models/search-item-response';
import { MessageService } from './message.service';

declare function require(url: string);
const default_response = require('../default_response.json');


@Injectable({
  providedIn: 'root'
})
export class ImageSearchService {

  // URL to web api
  private imageSearchUrl = 'http://47.74.213.82/image-search-webapp/search_picture';

  private picturesSubject = new Subject<Picture[]>();
  public pictures$ = this.picturesSubject.asObservable();

  private catIdSubject = new Subject<string>();
  public catId$ = this.catIdSubject.asObservable();

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  /** Log a ImageSearchService message with the MessageService */
  private log(message: string) {
    this.messageService.add(message);
  }

  private logClear() {
    this.messageService.clear();
  }

  getPictures(): void {
    this._getPictures().subscribe((pictures) => {
      this.picturesSubject.next(pictures);
    });
  }

  private _getPictures(): Observable<Picture[]> {
    return this.http.get<SearchItemResponse>(this.imageSearchUrl)
      .pipe(
        tap(response => {
          if (!response.SearchItemResponse.success) {
            throw new Error(response.SearchItemResponse.message);
          }
        }),
        map(response => response.SearchItemResponse.auctions),
        tap(response => this.log('fetched ' + response.length + ' pictures.')),
        catchError(this.handleError<Picture[]>(
          'getPictures',
          default_response.SearchItemResponse.auctions
        ))
      );
  }

  postPictures(files: FileList, cat_id: string): void {
    this.logClear();

    this._postPictures(files, cat_id).subscribe((pictures) => {
      this.picturesSubject.next(pictures);
    });
  }

  /* select pictures from Image Search order by similality */
  private _postPictures(files: FileList, cat_id: string): Observable<Picture[]> {
    if (files.length <= 0) {
      // if not search picture, return empty picture array.
      this.log('empty request');
      return of([]);
    }

    const file = files[0];
    const form = new FormData();
    form.append('file_name', file, file.name);
    form.append('cat_id', cat_id);

    return this.http.post<SearchItemResponse>(this.imageSearchUrl, form)
      .pipe(
        map(response => response.SearchItemResponse),
        tap(response => {
          if (!response.success) {
            throw new Error(response.message);
          }
          if (cat_id !== response.picInfo.category) {
            this.log('Category Auto Detedted.');
          }
          this.catIdSubject.next(response.picInfo.category);
        }),
        map(response => response.auctions),
        tap(_ => this.log(`found ${_.length} pictures matching "${file.name}"`)),
        catchError(this.handleError<Picture[]>('searchPictures', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
