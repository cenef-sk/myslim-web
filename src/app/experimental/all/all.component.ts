import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { MyslimService } from '../../myslim.service';
import { DisplayUsersComponent } from '../../data-providers/display-users/display-users.component';
import { DisplayThemesComponent } from '../../data-providers/display-themes/display-themes.component';
import { DisplayTopicsComponent } from '../../data-providers/display-topics/display-topics.component';
import { DisplayTrialsComponent } from '../../data-providers/display-trials/display-trials.component';
import { DisplayParticipantsComponent } from '../../data-providers/display-participants/display-participants.component';
import { DisplayDocumentsComponent } from '../../data-providers/display-documents/display-documents.component';

import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {

  @ViewChild('users') usersCmp: DisplayUsersComponent;
  @ViewChild('themes') themesCmp: DisplayThemesComponent;
  @ViewChild('topics') topicsCmp: DisplayTopicsComponent;
  @ViewChild('trials') trialsCmp: DisplayTrialsComponent;
  @ViewChild('participants') participantsCmp: DisplayParticipantsComponent;
  @ViewChild('documents') documentsCmp: DisplayDocumentsComponent;

  public editorStyle = {
    height: '200px'
  };
  public htmlText = null;
  public showIntro = false
  showHtml() {
    this.showIntro = !this.showIntro;
    // console.log(this.htmlText);
  }
  getHtml(){
    return this.sanitizer.bypassSecurityTrustHtml(this.htmlText);
  }

  public modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      // ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      // [{ 'direction': 'rtl' }],                         // text direction

      // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      // [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      // [{ 'font': [] }],
      // [{ 'align': [] }],

      // ['clean'],                                         // remove formatting button

      ['link', 'image', 'video']                         // link and image, video
    ]
  };

  // private modules = {
  //         'syntax': true,
  //         'toolbar': [
  //           [{ 'font': [] }, { 'size': [] }],
  //           [ 'bold', 'italic', 'underline', 'strike' ],
  //           [{ 'color': [] }, { 'background': [] }],
  //           [{ 'script': 'super' }, { 'script': 'sub' }],
  //           [{ 'header': '1' }, { 'header': '2' }, 'blockquote', 'code-block' ],
  //           [{ 'list': 'ordered' }, { 'list': 'bullet'}, { 'indent': '-1' }, { 'indent': '+1' }],
  //           [ 'direction', { 'align': [] }],
  //           [ 'link', 'image', 'video', 'formula' ],
  //           [ 'clean' ]
  //     ]
  //  }

  constructor(
    private globals: Globals,
    private router: Router,
    private myslimService: MyslimService,
    private sanitizer: DomSanitizer,
    @Inject('LOCALSTORAGE') public local,
  ) { }

  ngOnInit() {
  }

  public loginEmail =  "psmatana@gmail.com";
  public loginPassword = "123";
  public token = null;

  loginUser(){
    this.myslimService.getToken(this.loginEmail, this.loginPassword).subscribe((tokenRes) => {
      console.log(tokenRes)
      if (tokenRes.success) {
        this.local.setItem('accessToken', tokenRes.token);
        this.token = tokenRes.token;
      }
    },
    err => console.log(err)
    )
  }
  logoutUser(){
    this.local.removeItem('accessToken');
    this.token = null;
  }

  public userName = null;
  public userEmail =  null;
  public userPassword = null;

  createUser(){
    this.myslimService.createUser(this.userName, this.userEmail, this.userPassword).subscribe((user) => {
      console.log(user)
      this.usersCmp.ngOnInit()
    },
    err => console.log(err)
    )
  }

  public selectedUser = null
  onUserSelection(user) {
    this.selectedUser = user;
    console.log(user);
  }

  public selectedTheme = null
  onThemeSelection(theme) {
    this.selectedTheme = theme;
    console.log(theme);
  }

  public topicName = null;
  public topicDescription =  null;
  public topicTemplate = null;
  public topicPublic = null;

  createTopic(){
    // this.myslimService.createTopic(this.topicName, this.topicDescription, this.topicTemplate, this.topicPublic, "", true).subscribe((topic) => {
    //   console.log(topic)
    //   this.topicsCmp.ngOnInit()
    // },
    // err => console.log(err)
    // )
  }

  public selectedTopic = null
  onTopicSelection(topic) {
    this.selectedTopic = topic;
    console.log(topic);
  }

  public trialName = null;
  public trialCode =  null;

  createTrial(){
    this.myslimService.createTrialForTopic(this.selectedTopic._id, this.trialName, this.trialCode, false).subscribe((trial) => {
      console.log(trial)
      this.trialsCmp.ngOnInit()
    },
    err => console.log(err)
    )
  }

  public selectedTrial = null
  onTrialSelection(trial) {
    this.selectedTrial = trial;
    console.log(trial);
  }

  joinTrial() {
    this.myslimService.joinTrial(this.selectedTrial._id, "John Doe").subscribe((participant) => {
      console.log(participant)
    },
    err => console.log(err)
    )
  }

  public selectedParticipant = null
  onParticipantSelection(participant) {
    this.selectedParticipant = participant;
    console.log(participant);
  }

  public selectedDocument = null
  onDocumentSelection(document) {
    this.selectedDocument = document;
    console.log(document);
  }

  addDocument(){
    this.myslimService.addDocument(this.selectedParticipant._id, {age: 25}).subscribe((document) => {
      console.log(document)
    },
    err => console.log(err)
    )
  }
  updateDocument(){
    this.myslimService.updateDocument(this.selectedDocument, {age: 17}).subscribe((document) => {
      console.log(document)
    },
    err => console.log(err)
    )
  }


}
