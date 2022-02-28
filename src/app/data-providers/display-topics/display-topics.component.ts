import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { MyslimService } from '../../myslim.service';

@Component({
  selector: 'app-display-topics',
  templateUrl: './display-topics.component.html',
  styleUrls: ['./display-topics.component.css']
})
export class DisplayTopicsComponent implements OnInit {
    public topics = null;
    public displayedColumns: string[] = [
      // 'radio',
      // 'index',
      // 'name',
      // 'id',
      // 'topicName',
      // 'code',
      // 'participants',
      // 'language',
      // 'results',
      // 'run'
    ];


    public topicRadio = null;
    @Output() selection: EventEmitter<any> = new EventEmitter();
    @Input() tableType: string; //admin-all, guest-intro
    @Input() title: string;

    constructor(
      private globals: Globals,
      private router: Router,
      private myslimService: MyslimService
    ) { }

    ngOnInit() {
      this.myslimService.getTopicsForUser(this.globals.user._id).subscribe((data) => {
        console.log(data)
        this.topics = data;
        console.log(this.topics)
        console.log(this.topics.length)
        console.log(this.topics && this.topics.length)
      })

      if (this.tableType == "admin-all") {
        this.displayedColumns = ['radio','name',
          'language','results','run'];
      } else {
        this.displayedColumns = ['name',
          'language','run'];
      }
    }
    onItemChange(topic) {
      this.selection.emit(topic);
    }

    onShowStats() {
      this.router.navigate(['/teacher/statisticsteam']);
      // this.router.navigate(['/student/statisticsteam']);
      // this.router.navigate(['/admin/statisticsteam']);
    }
}
