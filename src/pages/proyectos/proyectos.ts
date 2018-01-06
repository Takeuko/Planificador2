import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import {Storage} from '@ionic/storage';
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
  proyectosUrl:string='http://localhost/planificador-backend/public/proyectos/';
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

  consultarProyectos(id:number)
  {
    this.http.get(this.proyectosUrl+id)
    .toPromise()
    .then(respuesta=>this.proyectos=respuesta.json());
  }
  


}