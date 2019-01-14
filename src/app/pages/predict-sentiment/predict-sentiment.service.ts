import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { TextSentimentPrediction } from '../twitter-analysis/standard-search/types';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://127.0.0.1:8000/api/";

@Injectable()
export class PredictSentimentService {

  constructor(private http: HttpClient) {}

  private handleError<T> (operation: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation, ': ', error); 
      return of(result as T);
    };
  }

  getSentimentPrediction(tsp: TextSentimentPrediction): Observable<TextSentimentPrediction> {
    const url = apiUrl + 'predict_sentiment/';
    return this.http.post<TextSentimentPrediction>(url, tsp, httpOptions).pipe(
      tap((text: TextSentimentPrediction) => console.log("request made")),
      catchError(this.handleError<TextSentimentPrediction>('getSentimentPrediction()'))
    );
  }

}
