import { Component, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-chat-settings',
  templateUrl: './chat-settings.component.html',
  styleUrls: ['./chat-settings.component.css']
})
export class ChatSettingsComponent implements OnInit {
  hypothesisFormControl = new FormControl("");
  showActivitiesControl = new FormControl(false);;

  constructor() { }

  ngOnInit() {
  }

  getData(){
    return({
      hypothesis: this.hypothesisFormControl.value,
      showActivities: this.showActivitiesControl.value
    });
  }

}
