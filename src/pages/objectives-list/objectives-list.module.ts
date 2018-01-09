import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ObjectivesListPage } from './objectives-list';

@NgModule({
  declarations: [
    ObjectivesListPage,
  ],
  imports: [
    IonicPageModule.forChild(ObjectivesListPage),
  ],
})
export class ObjectivesListPageModule {}
