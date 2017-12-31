import { Component } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators} from '@angular/forms';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Member } from '../register/member';
import { Objective, Task } from '../models';



/**
 * Generated class for the ObjetivoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-objetivo',
  templateUrl: 'objetivo.html',
})
export class ObjetivoPage 
{
  objetivos:Objective[];
  miembros:any;
  encargado:any;
  TareasArray:Task[];
  Objetivo:Objective;
  objetivo:FormGroup;
  objetivoParametro:Objective;
  constructor(public navCtrl: NavController, public navParams: NavParams, private fb:FormBuilder, private view:ViewController) 
  {

  }


  CrearFormulario(objetivo:Objective)
  {
    if(objetivo==null)
    {
      this.objetivo=this.fb.group({
        nombre:['', Validators.required],
        encargado:[null, Validators.required],
        tareas:this.fb.array([])
      });
      
    }
    else
    {
      this.objetivo=this.fb.group({
        nombre:[objetivo.name, Validators.required],
        encargado:[objetivo.manager, Validators.required],
        tareas:[objetivo.tasks]
      });
      
      //console.log(this.tareas.controls);
    }


  }

  public get tareas(): FormArray {
    return this.objetivo.get('tareas') as FormArray;
  };

  listo()
  {
    const data = this.objetivo.value;
    this.view.dismiss(data);
  }

  atras()
  {
    this.view.dismiss();
  }

  eliminarTarea(i:number)
  {
    this.tareas.removeAt(i);
  }

  agregarTarea()
  {
    this.tareas.push(this.crearTarea());
  }

  crearTarea():  FormGroup 
  {
    return this.fb.group({
            nombre: ['', Validators.required],
            encargado:[null, Validators.required]
    });
  }

  setTareas(tareas: Task[]) 
  {
    const addressFGs = tareas.map(address => this.fb.group(address));
    const addressFormArray = this.fb.array(addressFGs);
    this.objetivo.setControl('tareas', addressFormArray);
  }

  click()
  {
    console.log(this.objetivo.get('encargado').value);
  }

  ionViewWillLoad() 
  {
    this.miembros=this.navParams.get('miembros');
    this.objetivoParametro=this.navParams.get('objetivo');
    this.Objetivo=new Objective();
    this.Objetivo.tasks=[];
    this.CrearFormulario(this.objetivoParametro);
    this.setTareas(this.objetivo.get('tareas').value);
    console.log(this.objetivo.value);
    
  }

  

}
