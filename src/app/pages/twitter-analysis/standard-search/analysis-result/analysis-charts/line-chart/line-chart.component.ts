import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { Tweet } from '../../../types';
import { AnalysisLineChartService } from './line-chart.service'

@Component({
  selector: 'twitter-analysis-line-chart',
  template: `
    <chart type="line" [data]="data" [options]="options"></chart>
  `,
})

export class AnalysisLineChartComponent implements OnChanges {

  @Input() tweetData: Tweet[];
  @Input() sentimentAnalysisModel: string;

  data: any;
  options: any;

  constructor(private lineChartService: AnalysisLineChartService) {}

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    let res = this.lineChartService.getLineChartDataAndOptions(this.tweetData, this.sentimentAnalysisModel);
    this.data = res.data;
    this.options = res.option;
  }
}
