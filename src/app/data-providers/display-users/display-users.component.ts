import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { MyslimService } from '../../myslim.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-display-users',
  templateUrl: './display-users.component.html',
  styleUrls: ['./display-users.component.css']
})
export class DisplayUsersComponent implements OnInit {

  public users = null;
  public userRadio = null;
  @Output() selection: EventEmitter<any> = new EventEmitter();

  constructor(
    private globals: Globals,
    private router: Router,
    private myslimService: MyslimService
  ) { }

  ngOnInit() {
    this.myslimService.getUsers().subscribe((data) => {
      console.log(data)
      this.users = data;
    })
  }
  onItemChange(user) {
    this.selection.emit(user);
  }

}
