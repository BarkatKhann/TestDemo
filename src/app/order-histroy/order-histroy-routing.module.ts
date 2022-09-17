import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderHistroyPage } from './order-histroy.page';

const routes: Routes = [
  {
    path: '',
    component: OrderHistroyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderHistroyPageRoutingModule {}
