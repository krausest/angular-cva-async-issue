import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ICvainputComponentValue } from './cvainput/cvainput.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  fg = new FormGroup({
    cvainp: new FormControl<ICvainputComponentValue>({name:'example'})
  })
}
