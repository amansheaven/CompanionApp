import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'scan',
        loadChildren: () => import('../scan/scan.module').then( m => m.ScanPageModule)
      },
      {
        path: 'read',
        loadChildren: () => import('../read/read.module').then( m => m.ReadPageModule)
      },
      {
        path: 'beacons',
        loadChildren: () => import('../beacons/beacons.module').then( m => m.BeaconsPageModule)
      },
      {
        path: '',
        redirectTo: 'read',
        pathMatch: 'full'
      }
    ]
  },
  { path: '', redirectTo: '/tabs/tabs/read', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
