import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { MyslimService } from '../../myslim.service';

@Component({
  selector: 'app-display-themes',
  templateUrl: './display-themes.component.html',
  styleUrls: ['./display-themes.component.css']
})
export class DisplayThemesComponent implements OnInit {

  public themes = null;
  public themeRadio = null;
  @Output() selection: EventEmitter<any> = new EventEmitter();

  constructor(
    private globals: Globals,
    private router: Router,
    private myslimService: MyslimService
  ) { }

  ngOnInit() {
    this.myslimService.getThemes().subscribe((data) => {
      console.log(data)
      this.themes = data;
    })
  }
  onItemChange(theme) {
    this.selection.emit(theme);
  }

}
