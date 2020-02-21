import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeaconsPage } from './beacons.page';

const routes: Routes = [
  {
    path: '',
    component: BeaconsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeaconsPageRoutingModule {}
