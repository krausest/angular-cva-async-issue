import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ICvainputComponentValue } from './cvainput/cvainput.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  fg = new FormGroup({
    cvainp: new FormControl<ICvainputComponentValue>({name:'example', adress:'here1'}),
    cvainp2: new FormControl<ICvainputComponentValue>({name:'example2', adress: 'there2'})
  })
}
