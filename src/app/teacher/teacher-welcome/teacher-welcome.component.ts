import { Component, OnInit } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-teacher-welcome',
  templateUrl: './teacher-welcome.component.html',
  styleUrls: ['./teacher-welcome.component.css']
})
export class TeacherWelcomeComponent implements OnInit {

  constructor(private translate: TranslateService) { }

  ngOnInit() {
  }

}
