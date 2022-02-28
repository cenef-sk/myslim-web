import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  constructor(private globals: Globals, private router: Router) { }

  ngOnInit() {
  }

  save() {
    this.router.navigate(['/documents']);
  }
  cancel() {
    this.router.navigate(['/documents']);
  }
}
