import { Injectable, OnDestroy } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import { Tweet, TansformedTweet } from '../../../types';
import { ChartUtil } from '../chart-util'

@Injectable()
export class AnalysisBarChartService implements OnDestroy {

  themeSubscription: any;

  constructor(private theme: NbThemeService) {}

  private getUniqueSentiments(tweetData: TansformedTweet[], sentimentAnalysisModel: string)
  : string[] {
    return tweetData.map(tweet => {
      return tweet.sentiment_prediction[sentimentAnalysisModel];
    }).filter((s, i, ar) => {
      return ar.indexOf(s) === i;
    }).sort();
  }

  private getDevices(tweetData: Tweet[]): string[] {
    return tweetData.map(tweet => {
      return tweet.source
    }).filter((s, i, ar) => {
      return ar.indexOf(s) === i;
    });
  }

  private getDatasets(tweetData: Tweet[], sentimentAnalysisModel: string, devices: string[]) {
    let datasets = [],
    uniqueSentiments = this.getUniqueSentiments(tweetData, sentimentAnalysisModel);
    uniqueSentiments.forEach(sentiment => {
      let data: number[] = [];
      devices.forEach(device => {
        let count = tweetData.filter(tweet => {
          return tweet.source === device &&
          tweet.sentiment_prediction[sentimentAnalysisModel] === sentiment;
        }).length;
        data.push(count);
      });
      datasets.push({
        data: data,
        label: sentiment,
        backgroundColor: NbColorHelper.hexToRgbA(ChartUtil.getHexColor(sentiment), 0.8),
      })
    });
    console.log(datasets);
    return datasets;
  }

  getLineChartDataAndOptions(tweetData: Tweet[], sentimentAnalysisModel: string) {
    let result: any = {};
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const chartjs: any = config.variables.chartjs;
      let devices = this.getDevices(tweetData);
      result.data = {
        labels: devices,
        datasets: this.getDatasets(tweetData, sentimentAnalysisModel, devices),
      };
      result.options = {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
        },
      };
    });
    return result;
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
