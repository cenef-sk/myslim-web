import { Component, OnInit } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import mustache from 'mustache';
import { Validators, FormControl } from '@angular/forms';
import { MyslimService } from 'src/app/myslim.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {
  codeFormControl = new FormControl('', []);
  invalidCode=false;

  constructor(
    private globals: Globals,
    private myslimService: MyslimService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  joinCode() {
    const code = this.codeFormControl.value;
    this.myslimService.getTrialsForCode(code).subscribe((data) => {
      if(data && data.length == 1) {
        const trialId = data[0]._id;
        this.join(trialId);
      } else {
        this.invalidCode = true;
      }
    })

  }

  join(trialId) {
    this.globals.trialId = trialId;
    this.router.navigate(['/join/', trialId]);
  }

  onTrialSelection(trial) {
    console.log(trial);
    this.join(trial._id)
  }


}
