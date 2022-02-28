import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import { Router } from '@angular/router';

import { MultiDataSet, Label } from 'ng2-charts';
import { ChartOptions, ChartType, ChartDataSets, RadialChartOptions } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

      constructor(private globals: Globals, private router: Router) { }

      ngOnInit() {
      }

      back() {
        this.router.navigate(['/documents']);
      }
      public pieChartLabels = ['Sme.sk', 'Pravda.sk', 'Ministerstvo zivotneho prostredia', 'Ostatne'];
      public pieChartData = [1, 1, 1, 2];
      public pieChartType = 'pie';

      // Doughnut
      public doughnutChartLabels: Label[] = ['Pozitivne', 'Negativne'];
      public doughnutChartData: MultiDataSet = [
        [3, 2],
      ];
      public doughnutChartType: ChartType = 'doughnut';

      // events
      public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
        console.log(event, active);
      }

      public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
        console.log(event, active);
      }

      public barChartOptions: ChartOptions = {
        responsive: true,
        // We use these empty structures as placeholders for dynamic theming.
        scales: { xAxes: [{}], yAxes: [{}] },
        plugins: {
          datalabels: {
            anchor: 'end',
            align: 'end',
          }
        },
        legend: {
          display: false
        }
      };
      public barChartLabels: Label[] = ['Clanok o klimatickych zmenach SME', 'Klimaticke zmeny mytus', 'Zmen svoje ritualy', 'Co zanechame nasim detom'];
      public barChartType: ChartType = 'bar';
      public barChartLegend = true;
      public barChartPlugins = [pluginDataLabels];

      public barChartData: ChartDataSets[] = [
        { data: [3, 2, 1, 1, 1, 1, 1], label: 'Series A' },
        // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
      ];


      // Radar
      public radarChartOptions: RadialChartOptions = {
        responsive: true,
      };
      public radarChartLabels: Label[] = ['Peter', 'Juraj', 'Ivana', 'Zuzana', 'Julia', 'Greta', 'Juraj Novotny'];

      public radarChartData: ChartDataSets[] = [
        { data: [1, 3, 2, 1, 1, 1, 2], label: 'Positive' },
        { data: [3, 1, 2, 1, 1, 3, 0], label: 'Negative' }
      ];
      public radarChartType: ChartType = 'radar';
}
