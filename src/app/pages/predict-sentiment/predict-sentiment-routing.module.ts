import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PredictSentimentComponent } from './predict-sentiment.component';

import { StandardSearchComponent } from './standard-search/standard-search.component'

const routes: Routes = [{
  path: '',
  component: PredictSentimentComponent,
  children: [{
    path: 'predict-sentiment',
    component: StandardSearchComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PredictSentimentRoutingModule { }

export const routedComponents = [
  PredictSentimentComponent,
  StandardSearchComponent,
];
