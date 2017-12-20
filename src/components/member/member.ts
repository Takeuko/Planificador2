import { Component } from '@angular/core';

/**
 * Generated class for the MemberComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'member',
  templateUrl: 'member.html'
})
export class MemberComponent {

  text: string;

  constructor() {
    console.log('Hello MemberComponent Component');
    this.text = 'Hello World';
  }

}
