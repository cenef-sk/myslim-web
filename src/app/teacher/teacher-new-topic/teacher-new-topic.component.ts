import { Component, OnInit, ViewChild } from '@angular/core';
import { Globals } from 'src/app/globals';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { generateCode } from 'src/utils/trialCode';
import { MyslimService } from 'src/app/myslim.service';
import { ChatClimaticSettingsComponent } from 'src/app/templates/chat/chat-climatic-settings/chat-climatic-settings.component';
import { ChatSettingsComponent } from 'src/app/templates/chat/chat-settings/chat-settings.component';
import { FormSettingsComponent } from 'src/app/templates/form/form-settings/form-settings.component';

@Component({
  selector: 'app-teacher-new-topic',
  templateUrl: './teacher-new-topic.component.html',
  styleUrls: ['./teacher-new-topic.component.css']
})
export class TeacherNewTopicComponent implements OnInit {
    showClassGrp: FormGroup;
    nameFormControl = new FormControl('', [
      Validators.required,
    ]);
    templateFormControl = new FormControl(false);
    lngFormControl = new FormControl(false);
    code = null;
    publicTrialControl = new FormControl(false);
    customQuestionaire = new FormControl(false);
    showQuestionaire = new FormControl(false);
    showVideo = new FormControl(false);
    showIntro = new FormControl(false);
    minDocNum = new FormControl("1");
    hypothesisFormControl = new FormControl("")

    dataGenericChat = null;
    dataClimaticChat = null;
    dataGenericForm = null;

    constructor(
      private globals: Globals,
      private myslimService: MyslimService,
      private router: Router
    ) { }

    ngOnInit() {
      this.showClassGrp = new FormGroup({
        'publicTrialControl': new FormControl(false),
      });
      this.gCode();
    }

    gCode(){
      this.code = generateCode();
      this.myslimService.getTrialsForCode(this.code).subscribe((data) => {
        if(data && data.length) {
          this.gCode();
        }
      })
    }

    create() {
      //TODO for dotaznik
      let code = this.code;
      let template = this.templateFormControl.value
      let lng = this.lngFormControl.value
      if (template && this.nameFormControl.value) {
        let serviceFnc = null;
        if (template == "chat-climatic") {
          serviceFnc = this.myslimService.createTopic(
            this.nameFormControl.value,
            this.templateFormControl.value,
            "Viacero otázok o klimatických zmenách.",
            this.showVideo.value,
            this.showIntro.value,
            this.showQuestionaire.value,
            this.minDocNum.value,
            this.lngFormControl.value,
            this.publicTrialControl.value
          );
        }
        if (template == "chat-generic") {
          serviceFnc = this.myslimService.createTopic(
            this.nameFormControl.value,
            this.templateFormControl.value,
            this.hypothesisFormControl.value,
            this.showVideo.value,
            this.showIntro.value,
            this.showQuestionaire.value,
            this.minDocNum.value,
            this.lngFormControl.value,
            this.publicTrialControl.value
          );
        }
        if (template == "form-generic") {
          serviceFnc = this.myslimService.createTopic(
            this.nameFormControl.value,
            this.templateFormControl.value,
            this.hypothesisFormControl.value,
            false,
            false,
            false,
            0,
            this.lngFormControl.value,
            this.publicTrialControl.value
          );
        }
        serviceFnc.subscribe((topic) => {
          console.log(topic)
          this.myslimService.createTrialForTopic(topic._id, this.nameFormControl.value, code, this.publicTrialControl.value).subscribe((trial) => {
            console.log(trial)
            this.router.navigate(['/teacher/topics']);
          },
          err => console.log(err)
          )
        },
        err => console.log(err)
      )
      }
    }

    isForm(){
      return this.templateFormControl.value == 'form-generic'
    }
    isClimate(){
      return this.templateFormControl.value == 'chat-climatic'
    }
    isGeneric(){
      return this.templateFormControl.value == 'chat-generic'
    }
    cancel() {
      this.router.navigate(['/teacher/topics']);
    }

    isAdmin() {
      const res = this.globals.user.roles.includes('Admin')
      return res;
    }


    // @ViewChild(ChatClimaticSettingsComponent) chatClimaticCmp:ChatClimaticSettingsComponent;
    // @ViewChild(ChatSettingsComponent) chatGenericCmp:ChatSettingsComponent;
    // @ViewChild(FormSettingsComponent) formGenericCmp:FormSettingsComponent;
    //
    // updateChatClimaticData() {
    //   this.dataClimaticChat = this.chatClimaticCmp.getData();
    // }
    //
    // updateChatGenericData() {
    //   this.dataGenericChat = this.chatGenericCmp.getData();
    // }
    //
    // updateFormGenericData() {
    //   this.dataGenericForm = this.formGenericCmp.getData();
    // }


}
