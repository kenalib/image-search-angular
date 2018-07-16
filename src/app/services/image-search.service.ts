import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Picture } from '../models/picture';
import { SearchItemResponse } from '../models/search-item-response';
import { MessageService } from './message.service';
import { environment } from '../../environments/environment';

declare function require(url: string);
const default_response = require('../default_response.json');


@Injectable({
  providedIn: 'root'
})
export class ImageSearchService {

  // URL to web api
  private imageSearchUrl = environment.image_search_url;

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

  getPictures(): Observable<Picture[]> {
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

  /* select pictures from Image Search order by similality */
  postPictures(files: FileList, cat_id: string): Observable<Picture[]> {
    console.log('search file: length: ' + files.length + ' category: ' + cat_id);

    this.logClear();

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
            this.log('Category Auto Detected.');
          }
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
