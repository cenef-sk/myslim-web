import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.css']
})
export class AddDocumentComponent implements OnInit {

  constructor(private globals: Globals, private router: Router) { }

  ngOnInit() {
  }

  save() {
    console.log("save document")
    // this.router.navigate(['/documents']);
  }
  cancel() {
    this.router.navigate(['/documents']);
  }
}
