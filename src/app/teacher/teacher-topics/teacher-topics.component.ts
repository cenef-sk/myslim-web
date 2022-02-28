import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-topics',
  templateUrl: './teacher-topics.component.html',
  styleUrls: ['./teacher-topics.component.css']
})
export class TeacherTopicsComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

// user thinks that he is selecting topic but actually he selects trial
  onTrialSelection(trial) {
    console.log(trial);
    this.router.navigate(['/teacher/topics/' + trial._id]);
  }
  onNewTopic(){
    this.router.navigate(['/teacher/new-topic']);
  }
}
