import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { ThemeModule } from '../../@theme/theme.module';
import { TagComponent } from './tag/tag.component';
import { AnalysisResultComponent } from './standard-search/analysis-result/analysis-result.component'
import { AnalysisChartsComponent } from './standard-search/analysis-result/analysis-charts/analysis-charts.component'
import { AnalysisPieChartComponent } from './standard-search/analysis-result/analysis-charts/pie-chart.component'
import { AnalysisLineChartComponent } from './standard-search/analysis-result/analysis-charts/line-chart/line-chart.component'
import { AnalysisLineChartService } from './standard-search/analysis-result/analysis-charts/line-chart/line-chart.service'
import { AnalysisBarChartComponent } from './standard-search/analysis-result/analysis-charts/bar-chart/bar-chart.component'
import { AnalysisBarChartService } from './standard-search/analysis-result/analysis-charts/bar-chart/bar-chart.service'
import { TwitterAnalysisRoutingModule, routedComponents } from './twitter-analysis-routing.module';
import { StandardSearchAPIService } from './standard-search/standard-search-api.service'

const components = [
  TagComponent,
  AnalysisResultComponent,
  AnalysisChartsComponent,
  AnalysisPieChartComponent,
  AnalysisLineChartComponent,
  AnalysisBarChartComponent,
];

@NgModule({
  imports: [ThemeModule, TwitterAnalysisRoutingModule, NgxEchartsModule, NgxChartsModule, ChartModule],
  declarations: [...routedComponents, ...components],
  providers: [
    StandardSearchAPIService,
    AnalysisLineChartService,
    AnalysisBarChartService,
  ],
})
export class TwitterAnalysisModule {}
