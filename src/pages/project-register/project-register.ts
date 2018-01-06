import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController,AlertController, NavParams, Slides, Chip, ModalController, Modal } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import { Http, Headers } from '@angular/http';
import { Project, Objective} from '../models';
import { Member } from '../register/member';
import { SearchPage } from '../search/search';
import 'rxjs/add/operator/toPromise';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import {Storage} from '@ionic/storage';


// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { Element } from '@angular/compiler';
import { removeArrayItem } from 'ionic-angular/util/util';


/**
 * Generated class for the ProjectRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-project-register',
  templateUrl: 'project-register.html',
})
export class ProjectRegisterPage
{
  Chips: Member[];

  searchUrl:string='http://localhost/planificador-backend/public/members/';
  memberList: any;
  miembrosAñadidos: any;
  nuevoObjetivo:Objective;
  private searchTerms = new Subject<string>();
  slideActual:number;
  leader:number;
  leaderInfo:any;
  private headers = new Headers({'Content-Type': 'application/json; charset=utf-8;'});

  @ViewChild(Slides) Slides;
  registroProject:string ='http://localhost/planificador-backend/public/registrarproyecto';
  Project:Project;
  project:FormGroup;
  objetivoModificado:boolean;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams, public storage:Storage, public FB : FormBuilder, private http:Http, private modal:ModalController) 
  {
    this.storage.get('member').then(val=>this.leader=val['id']);   
    this.storage.get('member').then(val=>this.AgregarMiembro(val));   
    this.Chips=[];
    this.nuevoObjetivo=new Objective();
    this.Project=new Project();
    this.Project.members=[];
    this.Project.objectives=[];
    this.project=this.createMyForm(this.leader);
    this.setMembers(this.Project.members);
    this.setObjectives(this.Project.objectives);
    
  }

  buscar(term: string): void 
  {
    this.searchTerms.next(term);
  }
  
  ventanaObjetivo(objetivoParametro:Objective, index:number)
  {
    const paginaObjetivo: Modal = this.modal.create('ObjetivoPage', {miembros: this.project.get('miembros').value, objetivo:objetivoParametro, index:index});
    paginaObjetivo.present();


    paginaObjetivo.onDidDismiss((data)=>
    {
      if(data!==undefined)
      {

        const objective:Objective=new Objective();
        objective.name=data.nombre;
        objective.manager=data.encargado;
        objective.tasks=data.tareas;
        if(this.objectives.at(data.index)!==undefined)
        {
         
          this.objectives.at(data.index).setValue(objective);

        }
        else
        {
          this.objectives.push(this.createObjective(objective));
        }

      }


    });
  }

  ionViewDidLoad()
  {
    this.Slides.lockSwipeToNext(true);
    this.Slides.lockSwipeToPrev(true);
    
  }

  goToSlide()
  {
    this.Slides.lockSwipeToNext(false);
    let slideActual=this.Slides.getActiveIndex();
    this.Slides.slideTo(slideActual+1, 350);
    this.Slides.lockSwipeToNext(true);
  }

  goBack()
  {
    this.Slides.lockSwipeToPrev(false);
    let slideActual=this.Slides.getActiveIndex();
    this.Slides.slideTo(slideActual-1, 350);
    this.Slides.lockSwipeToPrev(true);
  }
  
  search(term: string) 
  {
    this.http
    .get(this.searchUrl+term)
    .toPromise()
    .then(response => 
    {
      this.memberList=response.json();
    });

  }

  public get objectives(): FormArray {
    return this.project.get('objectives') as FormArray;
  };

  public get members(): FormArray {
    return this.project.get('miembros') as FormArray;
  };

  goToSearch()
  {
  
    this.navCtrl.push(SearchPage);
  }


  private createMyForm(leader:number)
  {
	  return this.FB.group
	  ({
	    nombre: ['', [Validators.minLength(5), Validators.required]],
      descripcion: ['', Validators.required],
      beneficiosC: ['', Validators.required],
      beneficiosOL: ['', Validators.required],
      estudio: ['', Validators.required],
      notas: ['', Validators.required],
      presupuesto: [null,Validators.required],
      username:[''],
      miembros:this.FB.array([]),
      objectives:this.FB.array([]),
      leader:[]
      /*,
      prev_inv: ['', Validators.email],
     
      members:this.FB.array([]),
	    purpose: ['', Validators.required],
      leader: [null, Validators.required],
      begginingDate:[null, Validators.required],
      endDate:[null, Validators.required],*/
	   });
  }

  

  setObjectives(objectives: Objective[]) 
  {
    const addressFGs = objectives.map(address => this.FB.group(address));
    const addressFormArray = this.FB.array(addressFGs);
    this.project.setControl('objectives', addressFormArray);
  }

  setMembers(members: Member[]) 
  {
    const addressFGs = members.map(address => this.FB.group(address));
    const addressFormArray = this.FB.array(addressFGs);
    this.project.setControl('miembros', addressFormArray);
  }

  /*addObjective()
  {
    this.objectives.push(this.createObjective());

  }*/


  createObjective(objective:Objective) :  FormGroup 
  {
    return this.FB.group({
            name: [objective.name],
            manager:[objective.manager],
            tasks:[objective.tasks]
    });
  }


  MiembroExiste(miembro:Member)
  {
    for(var i = 0;i<this.project.get('miembros').value.length;i++) { 
      if(this.project.get('miembros').value[i].id ===miembro.id)
      {
        return true;
      }
   } 
   return false;
  }

  EliminarMiembro(i:number)
  {
    if(i!=0)
    this.members.removeAt(i);

  }

  AgregarMiembro(member: any)
  {
    this.members.push(this.CrearMiembro(member));
    this.Chips.push(member.id);
    
  }

  CrearMiembro(member: any) :  FormGroup 
  {
    return this.FB.group({
            nombre: [member.name, Validators.required],
            apellido: [member.lastname, Validators.required],
            username: [member.username, Validators.required],
            id:[member.id, Validators.required],


    });
  }


  createMember() :  FormGroup 
  {
    return this.FB.group({
            member: [null, Validators.required]
    });
  }

  deleteObjective(index:number)
  {
    this.objectives.removeAt(index);
  }

  RegistrarProyecto()
  {
    console.log(JSON.stringify(this.project.value));
    this.project.get('leader').setValue(this.leader);
    
    return this.http.post(this.registroProject, JSON.stringify(this.project.value), {headers: this.headers})
    .toPromise()
    .then(respuesta => 
      {
        this.Handle(respuesta.status);
       
        console.log(respuesta);
      }
      ).catch(this.handleError);

  }

  

  Handle(res:number)
  {
	if(res===201)
	{
		let alert = this.alertCtrl.create
		({
			title: 'Registro Exitoso',
			subTitle: 'Proyecto creado con exito',
			buttons: [{
				text:'Ok',
				handler: ()=>{ this.IraInicio();}
			}]
		});
		alert.present();
	}
	else if(res===209)
	{
		let alert = this.alertCtrl.create
		({
			title: 'Error',
			subTitle: 'El nombre de usuario, correo o teléfono que has ingresado, ya están ocupados, por favor ingresa los datos nuevamente.',
			buttons: ['Ok']
		});
		alert.present();
	}
  }

  private handleError(error: any): Promise<any> 
  {
	console.error('An error occurred', error._body); // for demo purposes only
	return Promise.reject(error.message || error);
  }


  IraInicio()
  {
    this.navCtrl.popToRoot();
  }

}
