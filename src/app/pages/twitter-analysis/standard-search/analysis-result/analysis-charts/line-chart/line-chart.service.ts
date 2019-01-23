import { Injectable, OnDestroy } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import { Tweet, TansformedTweet } from '../../../types';

@Injectable()
export class AnalysisLineChartService implements OnDestroy {

  themeSubscription: any;

  constructor(private theme: NbThemeService) {}


  // Convert a string of date time to timestamp and sort array
  private transformTweetData(tweetData: Tweet[]) {
    let transformedTweetData: TansformedTweet[] = tweetData;
    tweetData.forEach(function(tweet: Tweet, index) {
      transformedTweetData[index].created_at_timestamp = Date.parse(tweet.created_at.replace(/( \+)/, ' UTC$1'));
    });
    return transformedTweetData.sort(function(a,b) {
      return a.created_at_timestamp - b.created_at_timestamp;
    });
  }

  private getDateTimeLabel(timestamps: number[]) {
    return timestamps.map(function(t) {
      let d = new Date(t);
      return d.getFullYear() + '-' + d.getMonth()+1 + '-' + d.getDate() +
        ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    });
  }

  private createEquallySpacedArray(smallest: number, largest: number, arraySize: number): number[] {
    let space: number = (largest-smallest)/(arraySize-1),
    arr: any = [];
    for(let i=0; i<arraySize; i++) {
      arr.push(smallest + (space*i));
    }
    return arr;
  }

  // Create array of 7 equally spaced date times
  // date format  2014-08-20 15:30:00
  private getTimestampsForLabels(transformTweetData: TansformedTweet[]) {
    let smallest: number = transformTweetData[0].created_at_timestamp,
    largest: number = transformTweetData[transformTweetData.length-1].created_at_timestamp;
    let timestamps = this.createEquallySpacedArray(smallest, largest, 7);
    return timestamps;
  }

  private getHexColor(sentiment: string) {
    let color = {
     'positive': '#40ff00',
     'negative': '#ff4000',
     'neutral': '#00bfff'
    }
    if(Object.keys(color).includes(sentiment)) {
      return color[sentiment];
    } else {
      let otherColors = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000']
      return otherColors[Math.floor(Math.random() * otherColors.length)];
    }
  }

  private getUniqueSentiments(transformedTweetData: TansformedTweet[], sentimentAnalysisModel: string)
  : string[] {
    return transformedTweetData.map(tweet => {
      return tweet.sentiment_prediction[sentimentAnalysisModel];
    }).filter((s, i, ar) => {
      return ar.indexOf(s) === i;
    }).sort();
  }

  private getDatasets(transformedTweetData: TansformedTweet[], sentimentAnalysisModel: string, timestampLabels: number[]) {
    let datasets = [];
    let uniqueSentiments = this.getUniqueSentiments(transformedTweetData, sentimentAnalysisModel);

    for(let k=0; k<uniqueSentiments.length; k++) {
      let tweetDataPtr = 0, sentimentCounter = 0, data = [];
      for(let i=0; i<timestampLabels.length; i++) {
        while(
          tweetDataPtr < transformedTweetData.length &&
          transformedTweetData[tweetDataPtr].created_at_timestamp <= timestampLabels[i]
        ) {
          if(transformedTweetData[tweetDataPtr].sentiment_prediction[sentimentAnalysisModel] === uniqueSentiments[k]) {
            sentimentCounter++;
          }
          tweetDataPtr++;
        }
        let percentage = (sentimentCounter/tweetDataPtr)*100;
        data.push(parseFloat(percentage.toFixed(2)));
      }
      let color = this.getHexColor(uniqueSentiments[k]);
      datasets.push({
          data: data,
          label: uniqueSentiments[k],
          backgroundColor: NbColorHelper.hexToRgbA(color, 0.3),
          borderColor: color,
      });
    }
    return datasets;
  }

  getLineChartDataAndOptions(tweetData: Tweet[], sentimentAnalysisModel: string) {
    let result: any = {};
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const chartjs: any = config.variables.chartjs;
      let transformedTweetData: TansformedTweet[] = this.transformTweetData(tweetData),
        timestampLabels = this.getTimestampsForLabels(transformedTweetData);
      result.data = {
        labels: this.getDateTimeLabel(timestampLabels),
        datasets: this.getDatasets(transformedTweetData, sentimentAnalysisModel, timestampLabels),
      };
      result.options = {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          xAxes: [
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
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
      };
    });
    return result;
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
