import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-language-selection',
  templateUrl: './language-selection.component.html',
  styleUrls: ['./language-selection.component.css']
})
export class LanguageSelectionComponent implements OnInit {
  // @Input() world: any;
  @Output() lngChange = new EventEmitter<any>();
  public language = 'sk';

  constructor() { }

  ngOnInit() {
  }

  onSelect(language) {
    this.language = language;
    this.lngChange.emit(language);
  }
}
