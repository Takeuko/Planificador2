import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectRegisterPage } from './project-register';

@NgModule({
  declarations: [
    ProjectRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectRegisterPage),
  ],
})
export class ProjectRegisterPageModule {}
