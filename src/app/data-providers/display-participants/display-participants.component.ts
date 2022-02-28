import { Component, OnInit, EventEmitter, Output, Input, SimpleChange, SimpleChanges } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { MyslimService } from '../../myslim.service';
import { diffTime } from "src/utils/diffTime";

@Component({
  selector: 'app-display-participants',
  templateUrl: './display-participants.component.html',
  styleUrls: ['./display-participants.component.css']
})
export class DisplayParticipantsComponent implements OnInit {


    public participants = null;
    public participantRadio = null;
    @Output() selection: EventEmitter<any> = new EventEmitter();
    @Input() trialId: string;

    @Input() tableType: string; //admin-all, guest-intro, teacher-my
    @Input() title: string;
    @Input() noParticipantTitle: string;
    public displayedColumns: string[] = [
      // 'radio',
      // 'index',
      // 'name',
      // 'id',

      // 'topicName',
      // 'topicTemplate',
      // 'code',
      // 'participants',
      // 'language',
      // 'results',
      // 'run',
      // 'publicTrial',
      // 'share',
      // 'test'
      // 'detail'
      // 'duration'
    ];
    constructor(
      private globals: Globals,
      private router: Router,
      private myslimService: MyslimService
    ) { }

    ngOnInit() {
      this.loadData();
      this.displayedColumns = ['name', 'count', 'duration', 'questionaire' , 'detail'];
    }
    loadData() {
      this.myslimService.getParticipantsForTrial(this.trialId).subscribe((data) => {
        console.log(data)
        let participants = data.data.map( item => {
          if (item.data && item.data.interactionHistory && item.data.interactionHistory.length) {
            let res = diffTime(item.data.interactionHistory[0].dateTime, item.data.interactionHistory[item.data.interactionHistory.length - 1].dateTime)
            item.duration = res
          } else {
            item.duration = "?";
          }
          return item;
        })
        this.participants = participants;

      })
    }
    ngOnChanges(changes: SimpleChanges) {
      if (changes.trialId.previousValue != changes.trialId.currentValue) {
        this.loadData();
      }
    }
    onItemChange(participant) {
      this.selection.emit(participant);
    }

    onDetail(element) {
      this.router.navigate(['/teacher/statisticsteam/' + this.trialId + "/" + element._id]);
    }
}
