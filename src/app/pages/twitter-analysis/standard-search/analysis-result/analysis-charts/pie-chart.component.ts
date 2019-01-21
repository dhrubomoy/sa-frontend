import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { Tweet } from '../../types'

@Component({
  selector: 'twitter-analysis-pie-chart',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})

export class AnalysisPieChartComponent implements OnChanges {

  @Input() tweetData: Tweet[];
  @Input() sentimentAnalysisModel: any;

  options: any;

  constructor() {}
  
  /**
   * Return data should look like something like this:
   * [ {value:1548, name: 'Positive'},
   *   {value:5352, name: 'Negative'} ]
   */
  getPieChartData() {
    let uniqueSentiments = this.tweetData.map(tweet => {
      return tweet.sentiment_prediction[this.sentimentAnalysisModel];
    }).filter((s, i, ar) => {
      return ar.indexOf(s) === i;
    }).sort();
    let data = [];
    for(var i=0; i<uniqueSentiments.length; i++) {
      let item: any = {};
      item.name = uniqueSentiments[i];
      item.value = this.getSentimentCount(item.name);
      data.push(item);
    }
    return data;
  }

  getSentimentCount(prediction) {
    return this.tweetData.filter(t => {
        return t.sentiment_prediction[this.sentimentAnalysisModel] === prediction
    }).length;
  }

  setPieChartOptions() {
    this.options = {
      title: {
        text: 'Sentiment Analysis',
        subtext: 'Pie Chart',
        left: 'center'
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        bottom: 10,
        left: 'center',
        data: this.getPieChartData().map(d => d.name)
      },
      series : [{
        type: 'pie',
        radius : '65%',
        center: ['50%', '50%'],
        selectedMode: 'single',
        data: this.getPieChartData(),
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    };       
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    this.setPieChartOptions();
  }
}
