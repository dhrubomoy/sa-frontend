import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';

import { ThemeModule } from '../../@theme/theme.module';

import { TagComponent } from './tag/tag.component';
import { AnalysisResultComponent } from './standard-search/analysis-result/analysis-result.component'
import { AnalysisChartsComponent } from './standard-search/analysis-result/analysis-charts/analysis-charts.component'

import { PredictSentimentRoutingModule, routedComponents } from './predict-sentiment-routing.module';
import { StandardSearchAPIService } from './standard-search/standard-search-api.service'

const components = [
  TagComponent,
  AnalysisResultComponent,
  AnalysisChartsComponent,
];

@NgModule({
  imports: [ThemeModule, PredictSentimentRoutingModule, NgxEchartsModule, NgxChartsModule, ChartModule],
  declarations: [...routedComponents, ...components],
  providers: [
    StandardSearchAPIService,
  ],
})
export class PredictSentimentModule {}
