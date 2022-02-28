import { Component, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-settings',
  templateUrl: './form-settings.component.html',
  styleUrls: ['./form-settings.component.css']
})
export class FormSettingsComponent implements OnInit {
  hypothesisFormControl = new FormControl("");

  constructor() { }

  ngOnInit() {
  }

  getData(){
    return({
      hypothesis: this.hypothesisFormControl.value
    });
  }

}
