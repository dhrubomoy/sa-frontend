import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TwitterAnalysisComponent } from './twitter-analysis.component';

import { StandardSearchComponent } from './standard-search/standard-search.component'

const routes: Routes = [{
  path: '',
  component: TwitterAnalysisComponent,
  children: [{
    path: 'standard-search',
    component: StandardSearchComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TwitterAnalysisRoutingModule { }

export const routedComponents = [
  TwitterAnalysisComponent,
  StandardSearchComponent,
];
