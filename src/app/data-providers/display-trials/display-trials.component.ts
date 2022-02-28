import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { MyslimService } from '../../myslim.service';

@Component({
  selector: 'app-display-trials',
  templateUrl: './display-trials.component.html',
  styleUrls: ['./display-trials.component.css']
})
export class DisplayTrialsComponent implements OnInit {

      public trials = null;
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
        // 'export',
        // 'test'
      ];


      public trialRadio = null;
      @Output() selection: EventEmitter<any> = new EventEmitter();
      @Input() tableType: string; //admin-all, guest-intro, teacher-my
      @Input() title: string;
      @Input() noTrialTitle: string;

      constructor(
        private globals: Globals,
        private router: Router,
        private myslimService: MyslimService
      ) {
      }

      share(trial){
        let hypothesis = encodeURI(trial.topic.hypothesis)
          let url= 'https://www.facebook.com/sharer/sharer.php?kid_directed_site=0&sdk=joey&u=https%3A%2F%2Fkurz.myslim.eu%2Fjoin%2F' + trial._id + '&display=popup&ref=plugin&src=share_button&quote='+hypothesis

          let options = 'toolbar=0,status=0,resizable=1,width=626,height=436';
          window.open(url,'sharer',options);
      }

      export(trial){
        console.log(trial);

        let data = [["ahoj"], ["best"]]

        const replacer = (key, value) => (value === null ? '' : value); // specify how you want to handle null values here
        const header = Object.keys(data[0]);
        const csv = data.map((row) =>
          header
            .map((fieldName) => JSON.stringify(row[fieldName], replacer))
            .join(',')
        );
        csv.unshift(header.join(','));
        const csvArray = csv.join('\r\n');

        const a = document.createElement('a');
        const blob = new Blob([csvArray], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);

        a.href = url;
        a.download = 'export.csv';
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      }

      ngOnInit() {

        if (this.tableType == "admin-all") {
          this.myslimService.getTrials().subscribe((data) => {
            console.log(data)
            this.trials = data.map((item, index) => {return Object.assign({}, item, {index: index + 1})});
          })

          this.displayedColumns = ['radio','name', 'topicName','topicTemplate','participants',
            'language','results','run'];
        } else if (this.tableType == "guest-intro"){
          this.myslimService.getAllPublicTrials().subscribe((data) => {
            console.log(data)
            this.trials = data.map((item, index) => {return Object.assign({}, item, {index: index + 1})});
          })

          this.displayedColumns = ['topicName',
            'language','run'];
        } else if (this.tableType == "teacher-my") {
          this.myslimService.getTrialsForUser(this.globals.user._id).subscribe((data) => {
            console.log(data)
            this.trials = data.map((item, index) => {return Object.assign({}, item, {index: index + 1})});
          })

          this.displayedColumns = ['topicName', 'topicTemplate', 'code', 'participants',
            'language','publicTrial', 'results', 'share',
            // 'export', 
            'test'];
        }
      }
      onItemChange(trial) {
        this.selection.emit(trial);
      }

      onShowStats(elm) {
        this.router.navigate(['/teacher/statisticsteam/' + elm._id]);
        // this.router.navigate(['/student/statisticsteam']);
        // this.router.navigate(['/admin/statisticsteam']);
      }
      onTest(trial) {
        this.router.navigate(['/join/' + trial._id]);
        // this.router.navigate(['/student/statisticsteam']);
        // this.router.navigate(['/admin/statisticsteam']);
      }
    }
