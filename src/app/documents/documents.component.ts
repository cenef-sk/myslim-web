import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  constructor(private globals: Globals, private router: Router) { }

  ngOnInit() {
  }

  add() {
    this.router.navigate(['/documents/add']);
  }
  stats() {
    this.router.navigate(['/statistics']);
  }
  done() {
    this.router.navigate(['/']);
  }
  summary() {
    this.router.navigate(['/summary']);
  }
}
