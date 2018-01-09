import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

/**
 * Generated class for the ObjectivesListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-objectives-list',
  templateUrl: 'objectives-list.html',
})
export class ObjectivesListPage 
{

  objetivos:any;
  projectId:number;
  objetivosUrl:string='http://localhost/planificador-backend/public/proyectos/objetivos/';

  constructor(private http:Http, public navCtrl: NavController, public navParams: NavParams) 
  {
  }

  ionViewWillLoad()
  {
    this.projectId=this.navParams.get('id');
    this.obtenerObjetivos(this.projectId);
  }

  obtenerObjetivos(proyecto:number)
  {
    this.http.get(this.objetivosUrl+proyecto)
    .toPromise()
    .then(
      respuesta=>{
        this.objetivos=respuesta.json();
      }
    );
  }



}
