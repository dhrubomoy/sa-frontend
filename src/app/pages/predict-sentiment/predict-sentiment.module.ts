import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { PredictSentimentComponent } from './predict-sentiment.component';
import { PredictSentimentService } from './predict-sentiment.service'

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    PredictSentimentComponent
  ],
  providers: [
    PredictSentimentService
  ],
})
export class PredictSentimentModule { }
