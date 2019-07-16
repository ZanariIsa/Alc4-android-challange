import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ExpensesEnterancePage } from './expenses-enterance.page';

const routes: Routes = [
  {
    path: '',
    component: ExpensesEnterancePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ExpensesEnterancePage]
})
export class ExpensesEnterancePageModule {}
