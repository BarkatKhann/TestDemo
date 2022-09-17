import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderHistroyPageRoutingModule } from './order-histroy-routing.module';

import { OrderHistroyPage } from './order-histroy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderHistroyPageRoutingModule
  ],
  declarations: [OrderHistroyPage]
})
export class OrderHistroyPageModule {}
