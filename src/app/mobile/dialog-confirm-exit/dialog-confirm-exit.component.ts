import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-confirm-exit',
  templateUrl: './dialog-confirm-exit.component.html',
  styleUrls: ['./dialog-confirm-exit.component.css']
})
export class DialogConfirmExitComponent implements OnInit {


  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<DialogConfirmExitComponent>) {}

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onYesClick(): void {
    this.dialogRef.close();
    this.router.navigate(["/"]);
  }

}
