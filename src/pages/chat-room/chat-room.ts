import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams, ToastController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import {Storage} from '@ionic/storage';
 
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

  constructor(private storage:Storage, private navCtrl: NavController, private navParams: NavParams, private socket: Socket, private toastCtrl: ToastController) 
  {
    this.nickname = this.navParams.get('nickname');
 
    this.getMessages().subscribe(message => {
      this.messages.push(message);
    });
 
   
  }
 
  sendMessage() {
    this.socket.emit('add-message', { text: this.message });
    this.message = '';
  }
 
  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    })
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
    console.log(this.projectId);
  }

  ionViewDidLoad() 
  {
    this.projectId=this.navParams.get('data');
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