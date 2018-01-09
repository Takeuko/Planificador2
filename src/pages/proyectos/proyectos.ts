import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import {Storage} from '@ionic/storage';
import { ChatRoomPage } from '../chat-room/chat-room';
/**
 * Generated class for the ProyectosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-proyectos',
  templateUrl: 'proyectos.html',
})
export class ProyectosPage 
{

  proyectos:any;
  miembro:any;
  proyectosUrl:string='http://192.168.250.18/planificador-backend/public/proyectos/';
  constructor(private storage:Storage,public navCtrl: NavController, public navParams: NavParams, private http:Http,public alertCtrl: AlertController) 
  {
    this.storage.get('member').then(
      val=>
      {
        this.miembro=val;
        this.consultarProyectos(val['id']);
      }
    );
  }

  goToChatRoom(projectId:number)
  {
    this.navCtrl.push(ChatRoomPage, {data:projectId, nickName:this.miembro['username']});
  }

  consultarProyectos(id:number)
  {
    this.http.get(this.proyectosUrl+id)
    .toPromise()
    .then(respuesta=>
      {
        this.proyectos=respuesta.json();
      });

    
  }
  


}