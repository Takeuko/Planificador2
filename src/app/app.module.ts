import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SearchPage } from '../pages/search/search';
import {FirstPage} from '../pages/first/first';
import { HttpModule } from '@angular/http';
import { RegisterPage } from '../pages/register/register';
import { Home2Page } from '../pages/home2/home2';
import { ProjectRegisterPage } from '../pages/project-register/project-register';
import {ProyectosPage} from '../pages/proyectos/proyectos';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { IonicStorageModule } from '@ionic/storage';
import { ChatRoomPage } from '../pages/chat-room/chat-room';
import { UsersListPage} from '../pages/users-list/users-list';
import { ObjectivesListPage} from '../pages/objectives-list/objectives-list';
import { TaskListPage } from '../pages/task-list/task-list';
const config: SocketIoConfig = { url: 'http://192.168.250.18:3001', options: {} };

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    SocketIoModule.forRoot(config),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FirstPage,
    RegisterPage,
    Home2Page,
    ProyectosPage,
    ProjectRegisterPage,
    SearchPage,
    ChatRoomPage,
    UsersListPage,
    ObjectivesListPage,
    TaskListPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

