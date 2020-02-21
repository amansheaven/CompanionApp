import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BeaconsPageRoutingModule } from './beacons-routing.module';

import { BeaconsPage } from './beacons.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BeaconsPageRoutingModule
  ],
  declarations: [BeaconsPage]
})
export class BeaconsPageModule {}
