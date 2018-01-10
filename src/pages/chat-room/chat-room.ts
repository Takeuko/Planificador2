import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage, NavParams, ToastController, Content } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import {Storage} from '@ionic/storage';
import { UsersListPage} from '../users-list/users-list';
import { ObjectivesListPage} from '../objectives-list/objectives-list';
 
@IonicPage()
@Component({
  selector: 'page-chat-room',
  templateUrl: 'chat-room.html',
})
export class ChatRoomPage {
  messages = [];
  nickname = '';
  message = '';
 projectId:number;
 name:string;
 @ViewChild('content') content:Content;
 @ViewChild('input') input;

  constructor(private storage:Storage, private navCtrl: NavController, private navParams: NavParams, private socket: Socket, private toastCtrl: ToastController) 
  {
    this.nickname = this.navParams.get('nickname');
    this.name=this.navParams.get('data')['name'];
    this.name=this.name.toUpperCase();
    this.getMessages().subscribe(message => {
      this.messages.push(message);
    });

    this.focus(this.input);

   
  }

  verObjetivos()
  {
    this.navCtrl.push(ObjectivesListPage, {id:this.projectId, data:this.navParams.get('data')});
  }

  verEncargados()
  {
    this.navCtrl.push(UsersListPage, {id:this.projectId, data:this.navParams.get('data')});
  }

  focus(input)
  {
    setTimeout(()=>{
      this.input.setFocus();
      }, 0);
  }
 
  sendMessage(input) {
   
    this.socket.emit('add-message', { text: this.message });
    
    
    this.message = '';
    this.focus(input);
  }

  scrollDown()
  {
    this.content.scrollToBottom(250);
  }
 
  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    });
    
    
    return observable;
  }
 
  getUsers() {
    let observable = new Observable(observer => {
      this.socket.on('users-changed', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }
 
  ionViewWillLeave() {
    this.socket.disconnect();
  }
 
  joinChat() 
  {
    this.socket.connect();
    this.socket.emit('set-nickname', {projectName:this.projectId, nickName:this.nickname});
  }

  ionViewDidLoad() 
  {
    this.projectId=this.navParams.get('data')['id_proyecto'];
    this.nickname=this.navParams.get('nickName');
    this.joinChat();
  }
  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}