import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import { Router, ActivatedRoute } from '@angular/router';

import { MultiDataSet, Label } from 'ng2-charts';
import { ChartOptions, ChartType, ChartDataSets, RadialChartOptions } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { MyslimService } from "../myslim.service";

@Component({
  selector: 'app-statistics-team',
  templateUrl: './statistics-team.component.html',
  styleUrls: ['./statistics-team.component.css']
})
export class StatisticsTeamComponent implements OnInit {
    trialId;
    trial;
    participants;
    documents;

    sourcesState = false;
    urlState = false;

    constructor(
      private globals: Globals,
      private route: ActivatedRoute,
      private router: Router,
      private myslimService: MyslimService
    ) { }

    ngOnInit() {
      this.trialId = this.route.snapshot.paramMap.get('id');
      console.log(this.trialId)
      this.loadTrial(this.trialId)
      this.loadDocuments(this.trialId)
    }

    dataOk(){
      return this.documents && this.trial
    }

    loadTrial(id) {
      this.myslimService.getTrial(id).subscribe((data) => {
        if(data.data && data.data.length == 1) {
          this.trial = data.data[0];
          this.loadParticipants(id)
        }
      })
    }

    loadParticipants(id) {
        this.myslimService.getParticipantsForTrial(id).subscribe((data) => {
          console.log(data)
          let participants = data.data;
          this.participants = participants;
          this.computeHypothesis();
        })
    }

    sources = [];
    urls = [];

    loadDocuments(id) {
      this.myslimService.getDocumentsForTrial(id).subscribe((data) => {
        if(data.data) {
          this.documents = data.data;

          this.urls = this.documents.reduce((prev, curr) => {
            if (curr.data && curr.data.url) {
              let url = curr.data.url;
              if (url.length) {
                if (prev.includes(url)){
                  return prev
                } else {
                  return prev.concat(url)
                }
              }
            }
            return prev
          }, []);

          this.sources = this.documents.reduce((prev, curr) => {
            if (curr.data && curr.data.source) {
              let source = curr.data.source;
              if (source.length) {
                if (prev.includes(source)){
                  return prev
                } else {
                  return prev.concat(source)
                }
              }
            }
            return prev
          }, []);

          this.authorsOpinionCompute()
          this.respondentOpinionCompute()
          this.toolsCompute()
        }
      })
    }

    back() {
      this.router.navigate(['/documents']);
    }
    public pieChartLabels = ['Sme.sk', 'Pravda.sk', 'Ministerstvo zivotneho prostredia', 'Ostatne'];
    public pieChartData = [7, 4, 4, 3];
    public pieChartType = 'pie';

    isClimatic = false
    public labels4 = [
      "Triedenie odpadu",
      "Recyklácia u nás",
      "Letecká doprava",
      "Nezákonné skládky",
      "Vypúšťanie CO2",
      "Textilný priemysel",
    ]
    labels4Data = null
    computeHypothesis() {
      if (this.trial) {
        if (this.trial.topic && this.trial.topic.template == "chat-climatic") {
            let res = [0, 0, 0, 0, 0, 0];
            this.labels4Data = res
            if (this.participants) {
              this.participants.forEach(part => {
                if (part.data && part.data.intro && part.data.intro.hypothesis) {
                  let hypothesis = part.data.intro.hypothesis
                  if(hypothesis.startsWith("Triedenie")) res[0]++;
                  if(hypothesis.startsWith("Krajina")) res[1]++;
                  if(hypothesis.startsWith("Letecká")) res[2]++;
                  if(hypothesis.startsWith("V krajine")) res[3]++;
                  if(hypothesis.startsWith("Vypúšťanie")) res[4]++;
                  if(hypothesis.startsWith("Textilný")) res[5]++;

                }
                // let value = doc.data.author_opinion;
                // res[value-1]++
              })
              this.labels4Data = res;
              this.isClimatic = true
            }
        }
      }
    }

    public labels1 = [
      "úplne nesúhlasí",
      "skôr nesúhlasí",
      "neutralny postoj",
      "skôr súhlasí",
      "úplne súhlasí",
    ]
    labels1Data = null
    authorsOpinionCompute() {
      if (this.documents) {
        let res = [0, 0, 0, 0, 0];
        this.labels1Data = res
        this.documents.forEach(doc => {
          if (doc.data && doc.data.author_opinion) {
            let value = doc.data.author_opinion;
            res[value-1]++
          }
        })

        return res;
      }
      return null;
    }

    public labels3 = [
      "úplne nesúhlasí",
      "skôr nesúhlasí",
      "skôr súhlasí",
      "úplne súhlasí",
    ]
    labels3Data = null
    respondentOpinionCompute() {
      if (this.documents) {
        let res = [0, 0, 0, 0];
        this.documents.forEach(doc => {
          if (doc.data && doc.data.author_opinion) {
            let value = doc.data.agree_with_author;
            if (value > 2) value--;
            res[value-1]++
          }
        })
        this.labels3Data = res
        return res;
      }
      return null;
    }

    // Doughnut
    public doughnutChartLabels: Label[] = ['Pozitivne', 'Negativne'];
    public doughnutChartData: MultiDataSet = [
      [5, 1],
      [6, 2],
      [2, 5],
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
      },
      layout: {
          padding: {
              left: 0,
              right: 0,
              top: 20,
              bottom: 0
          }
      }
    };
    public barChartLabels: Label[] = [
       "obrázky",  "videá",  "štatistiky",  "clickbajty", "text a hovorené slovo"
    ];
    public barChartType: ChartType = 'bar';
    public barChartLegend = true;
    public barChartPlugins = [pluginDataLabels];

    labels2Data = null;
    toolsCompute() {
      if (this.documents) {
        let r = this.documents.map(doc => {
          if (doc.data && doc.data.tools && doc.data.tools.length) {
            return doc.data.tools.map((e) => {
              if(e) {
                return 1
              } else {
                return 0
              }
            })
          } else {
            return [0, 0, 0, 0, 0]
          }
        })
        let data = r.reduce((prev, curr) => {
          return prev.map( (num, idx) => {
            return num + curr[idx];
          });
        }, [0, 0, 0, 0, 0])
        console.log(data)
        this.barChartData =  [
          { data: data, label: '' },
          // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
        ]
        // this.documents.forEach(doc => {
        //   let value = doc.data.author_opinion;
        //   res[value-1]++
        // })

        // return res;
      } else {
        this.barChartData =  [
          { data: [0, 0, 0, 0, 0], label: '' },
          // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
        ]

      }
      this.labels2Data = true;
    }

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


    public modules = {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        // ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        // [{ 'direction': 'rtl' }],                         // text direction

        // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        // [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        // [{ 'font': [] }],
        // [{ 'align': [] }],

        // ['clean'],                                         // remove formatting button

        ['link',
        // 'image',
        'video']                         // link and image, video
      ]
    };

    public editorStyle = {
      height: '200px',
      width: '500px'
    };

}
