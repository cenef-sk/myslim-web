import { Component, OnInit } from '@angular/core';
import { Globals } from 'src/app/globals';
import { MyslimService } from 'src/app/myslim.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogConfirmExitComponent } from "src/app/mobile/dialog-confirm-exit/dialog-confirm-exit.component";
import { MatDialog } from "@angular/material";
import { timeStamps, diffTime } from "src/utils/diffTime";

@Component({
  selector: 'app-documents-form',
  templateUrl: './documents-form.component.html',
  styleUrls: ['./documents-form.component.css']
})
export class DocumentsFormComponent implements OnInit {
  participantId
  trialId
  participant;
  questionaire;
  intro;
  isTeacher = false;

  questionaireOpenState = false;
  i1(obj) {
    if(obj === "4") return "Psychologický pohľad na človeka"
    if(obj === "2") return "Snaha o pochopenie informácií"
    if(obj === "1") return "Vyvrátiť tvrdenie niekoho iného"
    return "---"
  }

  i2(obj) {
    if(obj === "16") return "Radosť"
    if(obj === "8") return "Sklamanie"
    if(obj === "4") return "Strach"
    if(obj === "2") return "Hnev"
    if(obj === "1") return "Prekvapenie"
    return "---"
  }

  t(obj) {
    if(obj === true) return "Áno"
    if(obj === false) return "Nie"
    if(obj === "yes") return "Áno"
    if(obj === "no") return "Nie"
    if(obj === "dontknow") return "Neviem"
  }
  s(obj) {
    if(!obj) return "---"
    else return obj
  }
  constructor(
    private globals: Globals,
    private myslimService: MyslimService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    // if(!this.globals.world.participant || !this.globals.world.participant._id) {
    //   this.router.navigate(['/']);
    // }

    this.trialId = this.route.snapshot.paramMap.get('trialId');
    if (this.trialId) {
      this.isTeacher = true;
    }
    this.participantId = this.route.snapshot.paramMap.get('id');
    console.log(this.participantId)
    this.loadParticipant(this.participantId)

  }

  qTime = "?";
  ctTime = "?";

  loadParticipant(id) {
    this.myslimService.getParticipant(id).subscribe((data) => {
      if(data.data && data.data) {
        this.participant = data.data;
        this.questionaire = this.participant && this.participant.data && this.participant.data.questionaire
        this.intro = this.participant && this.participant.data && this.participant.data.intro
        if (this.participant && this.participant.data && this.participant.data.interactionHistory && this.participant.data.interactionHistory.length) {
          let version = (this.participant.data.version)?this.participant.data.version:"1"

          let ih = this.participant.data.interactionHistory;
          let ctStart = ["crititcal-thinking-intro"];
          let ctEnd = ["annotation-ext"];

          let ctStartTime = timeStamps(ctStart, ih, version);
          let ctEndTime = timeStamps(ctEnd, ih, version);

          if (ctStartTime.length == 1 && ctEndTime.length == 1) {
            this.ctTime = diffTime(ctStartTime[0], ctEndTime[0]);
          }
          let qStart = ["questionaire"];
          let qEnd = ["final"];

          let qStartTime = timeStamps(qStart, ih, version);
          let qEndTime = timeStamps(qEnd, ih, version);

          if (qStartTime.length == 1 && qEndTime.length == 1) {
            this.qTime = diffTime(qStartTime[0], qEndTime[0]);
          }
        }


      }
    })
  }

  onNewDocument() {
    this.router.navigate(['/form/' + this.participantId + '/annotation']);
  }
  exitTeacher() {
    this.router.navigate(['/teacher/statisticsteam/' + this.trialId]);
  }
  onExit() {
    const dialogRef = this.dialog.open(DialogConfirmExitComponent, {
      width: '400px'
    });
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

          ['link',
          // 'image',
          'video']                         // link and image, video
        ]
      };

      public editorStyle = {
        height: '200px',
        width: '500px'
      };
}
