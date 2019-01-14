import { Component, Input } from '@angular/core';
import { Tweet, SentimentPrediction } from '../types'

@Component({
  selector: 'twitter-analysis-result',
  styleUrls: ['./analysis-result.component.scss'],
  templateUrl: './analysis-result.component.html',
})

export class AnalysisResultComponent {

  @Input() tweetData: Tweet[];
  // List of Machine Learning Models used in the backend.
  // Add/remove/change models in accordance with changes in backend
  sentimentAnalysisModels = [
    { name: 'Naive Bayes', key: 'naive_bayes' },
    { name: 'Pattern Analyzer', key: 'pattern_analyzer' },
    { name: 'RNN with word2vec', key: 'rnn_word2vec' },
    { name: 'RNN with GloVe', key: 'rnn_gloVe' }
  ]

  constructor() {}
  
}
