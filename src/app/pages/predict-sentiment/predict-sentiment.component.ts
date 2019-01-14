import { Component } from '@angular/core';
import { PredictSentimentService } from './predict-sentiment.service';
import { TextSentimentPrediction } from '../twitter-analysis/standard-search/types';
import { SENTIMENT_ANALYSIS_MODELS } from '../../@core/constants';

@Component({
  selector: 'predict-sentiment',
  templateUrl: './predict-sentiment.component.html',
})
export class PredictSentimentComponent {
  text: string = '';

  constructor(private predictSentimentService: PredictSentimentService) {}

  getSentimentPrediction() {
    let tsp: TextSentimentPrediction = { text: this.text };
    this.predictSentimentService.getSentimentPrediction(tsp).subscribe(s => {
      console.log(s);
    });
  }

}
