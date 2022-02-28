import { Component, OnInit, ViewChild } from '@angular/core';
import { Globals } from 'src/app/globals';
import { MyslimService } from 'src/app/myslim.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-document-annotation',
  templateUrl: './document-annotation.component.html',
  styleUrls: ['./document-annotation.component.css']
})
export class DocumentAnnotationComponent implements OnInit {
  document = {};
  participantId;
  participant;
  state = -1;
  shouldContinue = false;
  constructor(
    private globals: Globals,
    private myslimService: MyslimService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  doNothing(){

  }

  ngOnInit() {
    // console.log(this.globals.world.participant)
    // this.globals.world.participant = {_id: "60787ebfce2228112055d235"}
    // if(!this.globals.world.participant || !this.globals.world.participant._id) {
    //   this.router.navigate(['/']);
    // }
    this.participantId = this.route.snapshot.paramMap.get('id');

    console.log(this.participantId)
    this.loadParticipant(this.participantId)

  }

  loadParticipant(id) {
    this.myslimService.getParticipant(id).subscribe((data) => {
      if(data.data && data.data) {
        this.participant = data.data;
        this.start()
      }
    })
  }

  start(){
    this.state = 0;
    setTimeout(()=>{
      this.shouldContinue = true;
    }, 2000)
  }
  next() {
    setTimeout(()=>{
      this.shouldContinue = true;
    }, 2000)
    this.shouldContinue = false;
    this.state++;
  }

  create() {
    this.myslimService.addDocument(this.participantId, this.document).subscribe((document) => {
      console.log(document)
      this.router.navigate(['/form/' + this.participantId]);
    },
    err => console.log(err)
    )

  }

  cancel() {
    this.router.navigate(['/form']);
  }

  onAnswer2(option){
    this.document['author_opinion'] = 5-option;
    console.log(this.document)

    this.next();

  }

  onAnswer3(option){
    let data = [5,4,2,1]
    this.document['agree_with_author'] = data[option];
    console.log(this.document)

    this.next();
  }
  onAnswer5(option){
    this.document['author_additional'] = 1 + option;
    console.log(this.document)

    this.next();
  }

  onAnswer6(option){
    this.document['main_aim'] = option[0];
    console.log(this.document)

    this.next();
  }
  ucel = {
  "type": "free-text-check",
  "variable": "answer",
  "required": true,
  "answers": [
    {
      "answer": "Odborné informácie"
    },
    {
      "answer": "zábava"
    },
    {
      "answer": "blog"
    },
    {
      "answer": "osobné prezentovanie"
    },
    {
      "answer": "spravodajstvo"
    },
    {
      "answer": "Propagácia (reklama)"
    },
    {
      "answer": "diskusné fórum"
    },
    {
      "answer": "sociálna sieť"
    },
    {
      "answer": "zastrašovanie"
    },
    {
      "answer": "iné",
      "prompt": "text"
    }
  ],
  "button": "Ďalej"
}
onAnswer7(option){
  this.document['credibility'] = option[0];
  console.log(this.document)

  this.next();
}
dovera = {
  "type": "text",
  "variable": "answer",
  "type2": "scale10",
  "button": "Ďalej"
}

onAnswer8(option){
  this.document['content_aim'] = option[0];
  console.log(this.document)

  this.next();
}
ciel = {
  "type": "free-text-check",
  "variable": "answer",
  "required": true,
  "answers": [
    {
      "answer": "Informovať"
    },
    {
      "answer": "Pobaviť"
    },
    {
      "answer": "Vyjadriť názor"
    },
    {
      "answer": "Zastrašiť"
    },
    {
      "answer": "Vyvolať rozruch"
    },
    {
      "answer": "Propagovať (výrobok, službu, osobnosť, polit. stranu)"
    },
    {
      "answer": "Diskutovať"
    },
    {
      "answer": "Osveta"
    },
    {
      "answer": "Iné",
      "prompt": "text"
    }
  ],
  "button": "Ďalej"
}

onAnswer9(option){
  this.document['tools'] = option[0];
  console.log(this.document)

  this.next();
}
zaujat = {
  "type": "expand-check",
  "variable": "answer",
  "required": true,
  "answers": [
    {
      "answer": "obrázky",
      "recommendation": "Odporúčanie čo sledovať - nad čím sa zamyslieť:(aktuálne, neaktuálne, fotografia, ilustrácia, infografika, súvisiaci s témou, nesúvisiaci s témou)"
    },
    {
      "answer": "videá",
      "recommendation": "Odporúčanie čo sledovať  - nad čím sa zamyslieť:(aktuálne, neaktuálne animácia, realita, súvisiace s témou, nesúvisiace s témou s témou, reč tela)"
    },
    {
      "answer": "štatistiky",
      "recommendation": "Často sa nesprávne prezentujú dáta a štatistické výskumy. Bývajú najčastejším zdrojom chýb s veľkým vplyvom na laickú ale i na odbornú verejnosť."
    },
    {
      "answer": "clickbajty",
      "recommendation": "Clickbait je druh textu, ktorý má v prvom rade za cieľ nalákať užívateľa na kliknutie na určitý odkaz, titulok článku či k prehraniu videa."
    },
    {
      "answer": "text a hovorené slovo",
      "recommendation": "Odporúčanie čo sledovať  - nad čím sa zamyslieť: citove zafarbený jazyk, vulgárny jazyk, neodbornosť, hranie na emócie, clickbaity, argumentačné fauly (odkaz v bubline kde sú informácie k téme)"
    }
  ],
  "button": "Ďalej"
}
onAnswer10(option){
  this.document['me'] = 1 + option;
  console.log(this.document)

  this.next();
}

onAnswer11(option){
  this.document['why'] = option[0];
  console.log(this.document)

  this.next();
}

preco = {
  "type": "free-text-check",
  "variable": "answer",
  "required": true,
  "answers": [
    {
      "answer": "legislatíva (plánujú sa zmeny v zákonoch)"
    },
    {
      "answer": "informovanie (uviesť čitateľa do problematiky)"
    },
    {
      "answer": "propagácia (uvádza sa nový produkt na trh)"
    },
    {
      "answer": "zvýšenie návštevnosti stránky (clickbajty)"
    },
    {
      "answer": "Iné (uviesť)",
      "prompt": "text"
    }
  ],
  "button": "Ďalej"
}

}
