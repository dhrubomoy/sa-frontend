import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { SearchedTweet } from './types';
import { SENTIMENT_ANALYSIS_API } from '../../../@core/constants';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = SENTIMENT_ANALYSIS_API;

@Injectable()
export class StandardSearchAPIService {

  constructor(private http: HttpClient) {}

  private handleError<T> (operation: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation, ': ', error); 
      return of(result as T);
    };
  }

  getSearchedTweets(): Observable<SearchedTweet[]> {
    return this.http.get<SearchedTweet[]>(apiUrl + 'searched_tweets/')
      .pipe(
        tap(st => console.log('fetched searched tweets: ', st)),
        catchError(this.handleError('getSearchedTweets', []))
      );
  }

  addSearchedTweet(searchedTweet): Observable<SearchedTweet> {
    const url = apiUrl + 'searched_tweets/create/';
    return this.http.post<SearchedTweet>(url, searchedTweet, httpOptions).pipe(
      tap((searchedTweet: SearchedTweet) => console.log(`added searched tweet w/ query=${searchedTweet.query}`)),
      catchError(this.handleError<SearchedTweet>('addSearchedTweet'))
    );
  }

  deleteSearchedTweet(id): Observable<SearchedTweet> {
    const url = apiUrl + 'searched_tweets/' + id + '/delete/'; 
    return this.http.delete<SearchedTweet>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted searched tweet with id=${id}`)),
      catchError(this.handleError<SearchedTweet>('deleteSearchedTweet'))
    );
  }

}
