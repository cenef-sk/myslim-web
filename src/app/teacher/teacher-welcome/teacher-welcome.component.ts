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

  lng_specific(file) {
    const lng = this.translate.currentLang;
    const path = (lng, file) => "/assets/lngs/" + lng + "/" + file;
    switch(lng) {
      case "CZ": return path("cz", file);
      case "EN": return path("en", file);;
      default: return path("sk", file);;
    }
  }

}
