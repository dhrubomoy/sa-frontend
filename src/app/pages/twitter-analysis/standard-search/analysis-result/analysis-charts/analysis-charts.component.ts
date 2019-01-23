import { Component, Input } from '@angular/core';
import { Tweet } from '../../types'

@Component({
  selector: 'twitter-analysis-charts',
  templateUrl: './analysis-charts.component.html',
})

export class AnalysisChartsComponent  {

  @Input() tweetData: Tweet[];
  @Input() sentimentAnalysisModel: string;

}
