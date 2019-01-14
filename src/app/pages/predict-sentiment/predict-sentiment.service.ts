import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { TextSentimentPrediction, SentimentPrediction } from '../twitter-analysis/standard-search/types';
import { SENTIMENT_ANALYSIS_API } from '../../@core/constants'


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = SENTIMENT_ANALYSIS_API;

@Injectable()
export class PredictSentimentService {

  constructor(private http: HttpClient) {}

  private handleError<T> (operation: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation, ': ', error); 
      return of(result as T);
    };
  }

  getSentimentPrediction(tsp: TextSentimentPrediction): Observable<SentimentPrediction> {
    const url = apiUrl + 'predict_sentiment/';
    return this.http.post<SentimentPrediction>(url, tsp, httpOptions).pipe(
      tap((text: SentimentPrediction) => console.log("request made")),
      catchError(this.handleError<SentimentPrediction>('getSentimentPrediction()'))
    );
  }

}
