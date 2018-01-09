import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
/**
 * Generated class for the UsersListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-users-list',
  templateUrl: 'users-list.html',
})
export class UsersListPage 
{
  encargadosUrl:string='http://localhost/planificador-backend/public/proyectos/miembros/';
  encargados:any;
  projectId:number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http) 
  {
    
  }

  ionViewDidLoad() 
  {
    this.projectId=this.navParams.get('id');
    this.obtenerMiembros(this.projectId);
  }

  obtenerMiembros(proyecto:number)
  {
    this.http.get(this.encargadosUrl+proyecto)
    .toPromise()
    .then(respuesta=>
    {
      this.encargados=respuesta.json();
    });
  }

}
