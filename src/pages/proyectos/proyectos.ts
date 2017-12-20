import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
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
  public proyectos;
  public cant_proyectos;
  public nombre_proyecto;
  public id;
  public json;
  data:any={};
  constructor(public navCtrl: NavController, public navParams: NavParams, private http:Http,public alertCtrl: AlertController) 
  {
    this.id = navParams.get('id');
  }

  

  ionViewWillEnter() //Start
  {
    var datos =
    {
      'id':this.id

    }
    

    this.http.post('http://localhost/planificador/proyecto.php', datos).subscribe
  (data =>

    {
      this.data.response = data["_body"];
      //console.log(data["_body"]);
      this.proyectos = JSON.parse(data["_body"]);
      //this.nombre_proyecto = this.proyectos.nombre;

      /*
        let alert = this.alertCtrl.create
        ({
              title: 'Info de proyectos:',
              subTitle: data["_body"],
              buttons: ['OK']
          });
         /* for (var i=0; i<data["_body"]; i++) {
            this.proyectos.push(i);
          }
          console.log(data["_body"]);
          alert.present();*/
      },
    error => 
    {
         let alert = this.alertCtrl.create
        ({
              title: 'Error',
              subTitle: error,
              buttons: ['OK']
          });

        alert.present();

    }
    
  );
  }
}