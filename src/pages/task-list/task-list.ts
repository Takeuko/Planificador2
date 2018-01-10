import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';


/**
 * Generated class for the TaskListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-task-list',
  templateUrl: 'task-list.html',
})
export class TaskListPage {

  tareas:any;
  tareasUrl:string='http://localhost/planificador-backend/public/proyectos/objetivos/tareas/';
  objetivo:any;

  constructor(private http:Http, public navCtrl: NavController, public navParams: NavParams) 
  {
    //this.objetivo={};
  }

  obtenerTareas(id_objetivo:number)
  {
    this.http.get(this.tareasUrl+id_objetivo)
    .toPromise()
    .then(
      respuesta=>
      {
        this.tareas=respuesta.json();
        console.log(this.tareas);
      }
    );
  }

  ionViewWillLoad()
  {
    this.objetivo=this.navParams.get('data');
    this.obtenerTareas(this.objetivo['id']);
  }


}
