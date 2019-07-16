import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PlayBackFlashPage } from './play-back-flash.page';

const routes: Routes = [
  {
    path: '',
    component: PlayBackFlashPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PlayBackFlashPage]
})
export class PlayBackFlashPageModule {}
