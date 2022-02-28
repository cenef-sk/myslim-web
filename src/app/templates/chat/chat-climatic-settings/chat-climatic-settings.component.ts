import { Component, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-chat-climatic-settings',
  templateUrl: './chat-climatic-settings.component.html',
  styleUrls: ['./chat-climatic-settings.component.css']
})
export class ChatClimaticSettingsComponent implements OnInit {

  showActivitiesControl = new FormControl(false);;

  constructor() { }

  ngOnInit() {
  }

  getData(){
    return({
      showActivities: this.showActivitiesControl.value
    });
  }
}
