import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import { Http, Headers } from '@angular/http';
import { Project, Objective} from '../models';
import { Member } from '../register/member';
import { SearchPage } from '../search/search';
import 'rxjs/add/operator/toPromise';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';


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
export class ProjectRegisterPage implements OnInit
{
  searchUrl:string='http://localhost/planificador-backend/public/members/';
  memberList: Observable<Member[]>;
  private searchTerms = new Subject<string>();

  buscar(term: string): void 
  {
    this.searchTerms.next(term);
  }

  Project:Project;
  project:FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public FB : FormBuilder, private http:Http) 
  {
    this.Project=new Project();
    this.Project.objectives=[];
    this.project=this.createMyForm();
    this.setObjectives(this.Project.objectives);

  }

  ngOnInit()
  {
    this.memberList = this.searchTerms
    .debounceTime(300)        // wait 300ms after each keystroke before considering the term
    .distinctUntilChanged()   // ignore if next search term is same as previous
    .switchMap(term => term   // switch to new observable each time the term changes
      // return the http search observable
      ? this.search(term)
      // or the observable of empty heroes if there was no search term
      : Observable.of<Member[]>([]))
    .catch(error => {
      // TODO: add real error handling
      console.log(error);
      return Observable.of<Member[]>([]);
    });
  }
  
  search(term: string) 
  {
    return this.http
               .get(this.searchUrl+term)
               .map(response => response.json());
  }

  public get objectives(): FormArray {
    return this.project.get('objectives') as FormArray;
  };

  public get members(): FormArray {
    return this.project.get('members') as FormArray;
  };

  goToSearch()
  {
    this.navCtrl.push(SearchPage);
  }

  private createMyForm()
  {
	  return this.FB.group
	  ({
	    name: ['', [Validators.minLength(5), Validators.required]],
	    benefits: ['', Validators.required],
	    comments: ['', Validators.required],
      prev_inv: ['', Validators.email],
      objectives:this.FB.array([]),
      members:this.FB.array([]),
	    purpose: ['', Validators.required],
      leader: [null, Validators.required],
      begginingDate:[null, Validators.required],
      endDate:[null, Validators.required],
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
    this.project.setControl('members', addressFormArray);
  }

  addObjective()
  {
    this.objectives.push(this.createObjective());
  }


  createObjective() :  FormGroup 
  {
    return this.FB.group({
            name: ['', Validators.required],
            beggingDate: [null, Validators.required],
            endDate: [null, Validators.required],
            manager:[null, Validators.required]
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

}
