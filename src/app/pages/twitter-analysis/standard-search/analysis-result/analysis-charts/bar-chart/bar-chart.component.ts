import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { Tweet } from '../../../types';
import { AnalysisBarChartService } from './bar-chart.service'

@Component({
  selector: 'twitter-analysis-bar-chart',
  template: `
    <chart type="bar" [data]="data" [options]="options"></chart>
  `,
})

export class AnalysisBarChartComponent implements OnChanges {

  @Input() tweetData: Tweet[];
  @Input() sentimentAnalysisModel: string;

  data: any;
  options: any;

  constructor(private barChartService: AnalysisBarChartService) {}

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    let res = this.barChartService.getLineChartDataAndOptions(this.tweetData, this.sentimentAnalysisModel);
    this.data = res.data;
    this.options = res.option;
  }
}
