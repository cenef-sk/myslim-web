import { Component, OnInit } from '@angular/core';
import { Globals } from 'src/app/globals';
import { FormControl, Validators } from '@angular/forms';
import { MyslimService } from "src/app/myslim.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css']
})
export class TeacherProfileComponent implements OnInit {

  oldPasswordFormControl = new FormControl('', [
    Validators.required,
  ]);
  newPasswordFormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(
    private globals: Globals,
    private myslimService: MyslimService,
    private translate: TranslateService,

  ) { }

  ngOnInit() {
  }

  change() {
    if (this.oldPasswordFormControl.value && this.newPasswordFormControl.value) {
      this.myslimService.updateUser(this.globals.user._id, this.oldPasswordFormControl.value, this.newPasswordFormControl.value).subscribe((data) => {
        if (data.success) {
          alert(this.translate.instant('teacher.profileData.done'))
        } else {
          alert(this.translate.instant('teacher.profileData.wrong'))
        }
      })
    } else {
      alert(this.translate.instant('teacher.profileData.hint1'));
    }

  }

}
