import { Component, OnInit, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogTermsComponent } from '../../dialogs/dialog-terms/dialog-terms.component';
import { DialogAboutComponent } from "src/app/dialogs/dialog-about/dialog-about.component";

@Component({
  selector: 'app-teacher-layout',
  templateUrl: './teacher-layout.component.html',
  styleUrls: ['./teacher-layout.component.css']
})
export class TeacherLayoutComponent implements OnInit {

    public languages = ["SK", "CZ", "EN"];
    public language = "SK";

    constructor(
      private router: Router,
      private translate: TranslateService,
      public dialog: MatDialog,
      @Inject('LOCALSTORAGE') public local,
    ) {
      let savedLocale = this.local.getItem('locale');
      if (savedLocale) {
        this.setLanguage(savedLocale);
      }

    }

    ngOnInit() {
    }

    setLanguage(language){
      this.language = language;
      this.translate.use(language);
      this.local.setItem('locale', language)
    }

    openDialogTerms() {
      const dialogRef = this.dialog.open(DialogTermsComponent);

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }

    openDialogAbout() {
      const dialogRef = this.dialog.open(DialogAboutComponent);

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }

    enter(){
      this.router.navigate(['/login']);
    }
}
