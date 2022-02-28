import { Component, OnInit } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-teacher-activities',
  templateUrl: './teacher-activities.component.html',
  styleUrls: ['./teacher-activities.component.css']
})
export class TeacherActivitiesComponent implements OnInit {

  activities_sk = [
    ["Čo o mne (ne)vieš","Co_o_mne_nevies.pdf"],
    ["Čo robíte na internete?","Co_robite_na_internete.pdf"],
    ["Detektívi argumentačných faulov","Detektivi_argumentacnych_faulov.pdf"],
    ["Hon na čarodejnice","Hon_na_carodejnice.pdf"],
    ["Nájdi chybu v argumente","Najdi_chybu_v_argumente.pdf"],
    ["Iný uhol pohľadu","Iny_uhol_pohladu.pdf"],
    ["Na dvoch brehoch rieky","Na_dvoch_brehoch_rieky.pdf"],
    ["Nie je teória ako teória","Nie_je_teoria_ako_teoria.pdf"],
    ["Novinári v praxi","Novinari_v_praxi.pdf"],
    ["Pravdivá alebo falošná správa?","Pravdiva_alebo_falosna_sprava.pdf"],
    ["Príbeh o siedmich slepých myškách","Pribeh_o_siedmich_slepych_myskach.pdf"],
    ["Reklamná agentúra","Reklamna_agentura.pdf"],
    ["Hľadaj","Hladaj.pdf"],
    ["Over si fakty!","Over_si_fakty.pdf"],
  ];
  activities_cz = [
    ["Co o mně (ne)víš","Co_o_mne_ne_vis.pdf"],
    ["Co děláte na internetu","Co_delate_na_internetu.pdf"],
    ["Detektivové argumentačních faulů","Detektivove_argumentacnich_faulu.pdf"],
    ["Hon na čarodějnice","Hon_na_carodejnice.pdf"],
    ["Najdi chybu v argumentu","Najdi_chybu_v_argumentu.pdf"],
    ["Jiný úhel pohledu","Jiny_uhel_pohledu.pdf"],
    ["Na obou březích řeky","Na_obou_brezich_reky.pdf"],
    ["Není teorie jako teorie","Neni_teorie_jako_teorie.pdf"],
    ["Novináři v praxi","Novinari_v_praxi.pdf"],
    ["Pravdivé, nebo falešné zprávy?","Pravdive_nebo_falesne_zpravy.pdf"],
    ["Příběh o sedmi slepých myškách","Pribeh_o_sedmi_slepych_myskach.pdf"],
    ["Reklamní agentura","Reklamni_agentura.pdf"],
    ["Vyhledávání","Vyhledavani.pdf"],
    ["Zkontrolujte si fakta!","Zkontrolujte_si_fakta.pdf"],
  ];
  activities_en = [
    ["What you (don’t) know about me","What_you_dont_know_about_me.pdf"],
    ["What do you do on the internet?","What_do_you_do_on_the_internet.pdf"],
    ["Detecting logical fallacies","Detecting_logical_fallacies.pdf"],
    ["Witch hunt","Witch_hunt.pdf"],
    ["Find the flaw in the argument","Find_the_flaw_in_the_argument.pdf"],
    ["Different point of view","Different_point_of_view.pdf"],
    ["On two banks of the river","On_two_banks_of_the_river.pdf"],
    ["Not all theories are equal","Not_all_theories_are_equal.pdf"],
    ["Journalists in practise","Journalists_in_practise.pdf"],
    ["True or fake news?","True_or_fake_news.pdf"],
    ["The story of the seven blind mice","The_story_of_the_seven_blind_mice.pdf"],
    ["Advertising Agency","Advertising_agency.pdf"],
    ["Search","Search.pdf"],
    ["Check your facts!","Check_your_facts.pdf"],
  ];

  themes_sk = [
    "kritické myslenie", "mediálna gramotnosť", "digitálne občianstvo",
    "bezpečne online"
  ]

  themes_cz = [
    "kritické myšlení", "mediální gramotnost", "digitální občanství",
    "bezpečne online"
  ]

  themes_en = [
    "critical thinking", "media literacy", "digital citizenship",
    "safety online"
  ]

  activities:[string, string, string, number[], string][] = [
    ["10+", "<25", "20 min", [0,1,2], "124"],
    ["10+", "<30", "90 min", [0,1,2], "126"],
    ["15+", "<20", "60 min", [0,1], "137"],
    ["10+", "<20", "40 min", [0,1], "157"],
    ["15+", "<30", "40 - 60 min", [0,1,3], "177"],
    ["15+", "<20", "45 min", [0,1], "160"],
    ["15+", "<30", "60 min", [0,1], "174"],
    ["15+", "<25", "120 min", [0,1,2], "180"],
    ["10+", "<30", "60 min", [0,1,2], "184"],
    ["15+", "<20", "60 - 80 min", [0,1], "194"],
    ["10+", "<30", "30 min", [0,1], "201"],
    ["15+", "<30", "60 min", [0,1,2], "204"],
    ["15+", "<20", "45 min", [1,2], "154"],
    ["15+", "<20", "60 min", [0,1,2,3], "189"],
  ]

  displayedColumns: string[] = ['name', 'age', 'persons', 'time', 'themes', 'download', 'publication'];
  dataSource = null;

  constructor(private translate: TranslateService,) {
    translate.onLangChange.subscribe((params) => {this.ngOnInit()});
  }

  ngOnInit() {
    let cLng = this.translate.currentLang
    if (cLng == "SK") {
      this.dataSource = this.activities_sk.map((item, index) => {
        return({
          name: item[0],
          age: this.activities[index][0],
          persons: this.activities[index][1],
          time: this.activities[index][2],
          themes: this.activities[index][3].map( (item) => this.themes_sk[item]).join(', '),
          publication: this.activities[index][4] + "s",
          file: "sk/" + item[1]
        })
      });
    }
    if (cLng == "CZ") {
      this.dataSource = this.activities_cz.map((item, index) => {
        return({
          name: item[0],
          age: this.activities[index][0],
          persons: this.activities[index][1],
          time: this.activities[index][2],
          themes: this.activities[index][3].map( (item) => this.themes_cz[item]).join(', '),
          publication: this.activities[index][4] + "s",
          file: "cz/" + item[1]
        })
      });
    }
    if (cLng == "EN") {
      this.dataSource = this.activities_en.map((item, index) => {
        return({
          name: item[0],
          age: this.activities[index][0],
          persons: this.activities[index][1],
          time: this.activities[index][2],
          themes: this.activities[index][3].map( (item) => this.themes_en[item]).join(', '),
          publication: this.activities[index][4] + "p",
          file: "en/" + item[1]
        })
      });
    }
  }
}
