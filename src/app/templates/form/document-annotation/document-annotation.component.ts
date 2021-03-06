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
      "answer": "Odborn?? inform??cie"
    },
    {
      "answer": "z??bava"
    },
    {
      "answer": "blog"
    },
    {
      "answer": "osobn?? prezentovanie"
    },
    {
      "answer": "spravodajstvo"
    },
    {
      "answer": "Propag??cia (reklama)"
    },
    {
      "answer": "diskusn?? f??rum"
    },
    {
      "answer": "soci??lna sie??"
    },
    {
      "answer": "zastra??ovanie"
    },
    {
      "answer": "in??",
      "prompt": "text"
    }
  ],
  "button": "??alej"
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
  "button": "??alej"
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
      "answer": "Informova??"
    },
    {
      "answer": "Pobavi??"
    },
    {
      "answer": "Vyjadri?? n??zor"
    },
    {
      "answer": "Zastra??i??"
    },
    {
      "answer": "Vyvola?? rozruch"
    },
    {
      "answer": "Propagova?? (v??robok, slu??bu, osobnos??, polit. stranu)"
    },
    {
      "answer": "Diskutova??"
    },
    {
      "answer": "Osveta"
    },
    {
      "answer": "In??",
      "prompt": "text"
    }
  ],
  "button": "??alej"
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
      "answer": "obr??zky",
      "recommendation": "Odpor????anie ??o sledova?? - nad ????m sa zamyslie??:(aktu??lne, neaktu??lne, fotografia, ilustr??cia, infografika, s??visiaci s t??mou, nes??visiaci s t??mou)"
    },
    {
      "answer": "vide??",
      "recommendation": "Odpor????anie ??o sledova??  - nad ????m sa zamyslie??:(aktu??lne, neaktu??lne anim??cia, realita, s??visiace s t??mou, nes??visiace s t??mou s t??mou, re?? tela)"
    },
    {
      "answer": "??tatistiky",
      "recommendation": "??asto sa nespr??vne prezentuj?? d??ta a ??tatistick?? v??skumy. B??vaj?? naj??astej????m zdrojom ch??b s ve??k??m vplyvom na laick?? ale i na odborn?? verejnos??."
    },
    {
      "answer": "clickbajty",
      "recommendation": "Clickbait je druh textu, ktor?? m?? v prvom rade za cie?? nal??ka?? u????vate??a na kliknutie na ur??it?? odkaz, titulok ??l??nku ??i k prehraniu videa."
    },
    {
      "answer": "text a hovoren?? slovo",
      "recommendation": "Odpor????anie ??o sledova??  - nad ????m sa zamyslie??: citove zafarben?? jazyk, vulg??rny jazyk, neodbornos??, hranie na em??cie, clickbaity, argumenta??n?? fauly (odkaz v bubline kde s?? inform??cie k t??me)"
    }
  ],
  "button": "??alej"
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
      "answer": "legislat??va (pl??nuj?? sa zmeny v z??konoch)"
    },
    {
      "answer": "informovanie (uvies?? ??itate??a do problematiky)"
    },
    {
      "answer": "propag??cia (uv??dza sa nov?? produkt na trh)"
    },
    {
      "answer": "zv????enie n??v??tevnosti str??nky (clickbajty)"
    },
    {
      "answer": "In?? (uvies??)",
      "prompt": "text"
    }
  ],
  "button": "??alej"
}

}
