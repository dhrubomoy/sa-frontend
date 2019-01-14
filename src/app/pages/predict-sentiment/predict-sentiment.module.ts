import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ThemeModule } from '../../@theme/theme.module';
import { PredictSentimentComponent } from './predict-sentiment.component';

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    PredictSentimentComponent
  ],
  providers: [
  ],
})
export class PredictSentimentModule { }
