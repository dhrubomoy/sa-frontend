import { Component } from '@angular/core';
import { PredictSentimentService } from './predict-sentiment.service';
import { TextSentimentPrediction, SentimentPredictionModel, SentimentPrediction } from '../twitter-analysis/standard-search/types';
import { SENTIMENT_ANALYSIS_MODELS } from '../../@core/constants';

@Component({
  selector: 'predict-sentiment',
  templateUrl: './predict-sentiment.component.html',
  styleUrls: ['./predict-sentiment.component.scss'],
})
export class PredictSentimentComponent {
  text: string = '';
  predictions: SentimentPredictionModel[] = [];

  constructor(private predictSentimentService: PredictSentimentService) {}

  setPredictions(s: SentimentPrediction) {
    this.predictions = [];
    let models = SENTIMENT_ANALYSIS_MODELS;
    let modelKeys = models.map(m => m.key);
    for(var alg in s) {
      if(modelKeys.includes(alg)) {
        let prediction: SentimentPredictionModel = {
          modelName: this.getModelName(models, alg),
          sentiment: s[alg]
        };
        this.predictions.push(prediction);
      }
    }
    console.log(this.predictions);
  }

  getModelName(models: any, alg: String): String {
    return models.find(function(m: any) {
      return m.key === alg;
    }).name;
  }

  getSentimentPrediction() {
    let tsp: TextSentimentPrediction = { text: this.text };
    this.predictSentimentService.getSentimentPrediction(tsp).subscribe(s => {
      this.setPredictions(s);
    });
  }

}
