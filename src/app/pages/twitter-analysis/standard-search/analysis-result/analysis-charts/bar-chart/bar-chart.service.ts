import { Injectable, OnDestroy } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import { Tweet, TansformedTweet } from '../../../types';

@Injectable()
export class AnalysisBarChartService implements OnDestroy {

  themeSubscription: any;

  constructor(private theme: NbThemeService) {}

  // private getHexColor(sentiment: string) {
  //   let color = {
  //    'positive': '#40ff00',
  //    'negative': '#ff4000',
  //    'neutral': '#00bfff'
  //   }
  //   if(Object.keys(color).includes(sentiment)) {
  //     return color[sentiment];
  //   } else {
  //     let otherColors = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000']
  //     return otherColors[Math.floor(Math.random() * otherColors.length)];
  //   }
  // }

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
        backgroundColor: '#40ff00',
      })
    });
    console.log(datasets);
    return datasets;
  }

  getLineChartDataAndOptions(tweetData: Tweet[], sentimentAnalysisModel: string) {
    let result: any = {};
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;
      let devices = this.getDevices(tweetData);
      result.data = {
        labels: devices,
        datasets: this.getDatasets(tweetData, sentimentAnalysisModel, devices),
        // [{
        //   data: [65, 59, 80, 81, 56, 55, 40],
        //   label: 'Series A',
        //   backgroundColor: NbColorHelper.hexToRgbA(colors.primaryLight, 0.8),
        // }, {
        //   data: [28, 48, 40, 19, 86, 27, 90],
        //   label: 'Series B',
        //   backgroundColor: NbColorHelper.hexToRgbA(colors.infoLight, 0.8),
        // }],
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
