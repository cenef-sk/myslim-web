import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material";

declare let pdfjsLib;

@Component({
  selector: 'app-dialog-activity',
  templateUrl: './dialog-activity.component.html',
  styleUrls: ['./dialog-activity.component.css']
})
export class DialogActivityComponent implements OnInit {
  curP = 1;
  numP = 0;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
      this.renderPage(this.curP)
  }

  next() {
    if (this.curP < this.numP) {
      this.curP += 1
      this.renderPage(this.curP)
    }
  }
  prev() {
    if (this.curP > 1) {
      this.curP -= 1
      this.renderPage(this.curP)
    }
  }
  renderPage(i): void {
    // var pdfjsLib = window['pdfjs-dist/build/pdf'];
    console.log("SHOW PDF")
    // if (!pdfjsLib.getDocument) {
    //   // eslint-disable-next-line no-alert
    //   alert("Please build the pdfjs-dist library using\n `gulp dist-install`");
    //   // you can now use *pdf* here
    // });

    var loadingTask = pdfjsLib.getDocument('/assets/activities/aktivita_004_Viac_alebo_menej.pdf');
    // var loadingTask = pdfjsLib.getDocument('/assets/activities/aktivita_007_Karikatura.pdf');
    loadingTask.promise.then((pdf) => {
      this.numP = pdf.numPages;
      pdf.getPage(i).then((page) => {

        var scale = 1.5;
        var viewport = page.getViewport({ scale: scale,
        });

        var canvas: any = document.getElementById('the-canvas');
        var context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        var renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        page.render(renderContext);

      });
    })
  }
}
