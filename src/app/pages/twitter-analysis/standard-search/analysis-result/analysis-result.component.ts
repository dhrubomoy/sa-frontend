import { Component, Input } from '@angular/core';
import { Tweet } from '../types'
import { SENTIMENT_ANALYSIS_MODELS } from '../../../../@core/constants'

@Component({
  selector: 'twitter-analysis-result',
  styleUrls: ['./analysis-result.component.scss'],
  templateUrl: './analysis-result.component.html',
})

export class AnalysisResultComponent {

  @Input() tweetData: Tweet[];
  sentimentAnalysisModels = SENTIMENT_ANALYSIS_MODELS;

  constructor() {}
  
}
