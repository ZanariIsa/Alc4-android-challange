import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CashflowDashboardPage } from './cashflow-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: CashflowDashboardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CashflowDashboardPage]
})
export class CashflowDashboardPageModule {}
