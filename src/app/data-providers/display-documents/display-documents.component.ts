import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { MyslimService } from '../../myslim.service';

import { diffTime, timeStamps } from "src/utils/diffTime";
import { SharedService } from "src/app/shared.service";

@Component({
  selector: 'app-display-documents',
  templateUrl: './display-documents.component.html',
  styleUrls: ['./display-documents.component.css']
})
export class DisplayDocumentsComponent implements OnInit {

      public documents = null;
      curr = null;
      public documentRadio = null;
      @Output() selection: EventEmitter<any> = new EventEmitter();
      @Input() participantId: string;

      @Input() tableType: string; //admin-all, guest-intro, teacher-my
      @Input() title: string;
      @Input() noDocumentTitle: string;
      public displayedColumns: string[] = [
        // 'radio',
        // 'index',
        // 'url',
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
      ];
      s(obj) {
        if(!obj) return "---"
        else return obj
      }
      t(type, obj) {
        if (obj) {
          if (type == 1) {
            let data = ["---"].concat(this.ss.getAll('authorsOpinion').reverse())
            return data[obj];
          }
          if (type == 2) {
           let data = [
           "---",
           this.ss.getA('myOpinion',3),
           this.ss.getA('myOpinion',2),
           "---",
           this.ss.getA('myOpinion',1),
           this.ss.getA('myOpinion',0),
          ]
          return data[obj];
          }
          if (type == 3) {
           let data = ["---"].concat(this.ss.getAll('moreAuthor'))
          return data[obj];
          }
          if (type == 4) {
           let data = this.ss.getAll('ucel')
           let res = this.buildFromCheck(data, obj);
           return res;
          }
          if (type == 5) {
          let res = this.formatLabel(obj);

          return res;
          }
          if (type == 6) {
           let data = this.ss.getAll('ciel')
          let res = this.buildFromCheck(data, obj);

          return res;
          }
          if (type == 7) {
           let data = this.ss.getAll('zaujat')
          let res = this.buildFromCheck(data, obj);

          return res;
          }
          if (type == 8) {
           let data = ["---"].concat(this.ss.getAll('yesno'))
           return data[obj];
          }
          if (type == 9) {
           let data = this.ss.getAll('preco')
          let res = this.buildFromCheck(data, obj);

          return res;
          }

          return "---"
        } else return "---"
      }

      formatLabel(value) {
      const labels = this.ss.getAll('credibility');
      let res;
      switch(true){
        case (value>=9):
          res = labels[4]
          break;
        case (value>=7):
          res = labels[3]
          break;
        case (value>=4):
          res = labels[2]
          break;
        case (value>=2):
          res = labels[1]
          break;
        default:
          res = labels[0]
      }
      return res +"(" + (10 - value) + ")";
    }
      buildFromCheck(data, obj) {
        let res;
        if (obj && obj.length) {
          res = obj.reduce((prev, curr, index) => {
            if(curr && curr.length == 2) {
              if(curr[0]) {
                if(data[index]){
                  let text = ""
                  if (curr[1]){
                    text = "(" + curr[1] + ")"
                  }
                  return prev + data[index] + text + ","
                } else {
                  return prev
                }
              }  else {
                return prev
              }
            } else if (curr){
              if(data[index]){
                return prev + data[index] + ","
              } else {
                return prev
              }

            } else {
              return prev
            }
          }, "")
        } else {
          res = "---"
        }
        return res
      }
      constructor(
        private globals: Globals,
        private router: Router,
        private myslimService: MyslimService,
        private ss: SharedService,
      ) {
      }

      ngOnInit() {
        this.loadData();
        this.displayedColumns = ['radio', 'index','url', 'id'];
      }

      docTimes = [];

      loadData() {
        this.myslimService.getDocumentsForParticipant(this.participantId).subscribe((data) => {
          console.log(data)
          if (data && data.data && data.data.length && data.data[0].participant) {
            let part = data.data[0].participant;
            if (part && part.data && part.data.interactionHistory && part.data.interactionHistory.length) {
              let ih = part.data.interactionHistory;
              // console.log(ih.length)
              let version = (part.data.version)?part.data.version:"1"

              let docSeparators = ["new-document", "annotation-simple", "opinion-check"];
              let docTimes = timeStamps(docSeparators, ih, version);
              this.docTimes = docTimes.reduce((prev, curr) => {
                if (prev.length) {
                  prev[prev.length - 1] = prev[prev.length - 1].concat(curr);
                  prev = prev.concat([[curr]])
                  return prev
                } else {
                  return [[curr]]
                }
              },[]).filter(frame => frame.length == 2).map(frame => diffTime(frame[0], frame[1]))
            }
          }
          this.documents = data.data;
        })
      }
      ngOnChanges(changes: SimpleChanges) {
        if (changes.participantId.previousValue != changes.participantId.currentValue) {
          this.loadData();
        }
      }
      onItemChange(document) {
        this.selection.emit(document);
      }
      getString(json) {
        return (JSON.stringify(json))
      }
}
