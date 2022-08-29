import { Component, OnInit, ViewChild } from '@angular/core';
import { Globals } from 'src/app/globals';
import { MyslimService } from 'src/app/myslim.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from "src/app/shared.service";
import { TranslateService } from "@ngx-translate/core";

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
    private router: Router,
    private ss: SharedService,
    private translate: TranslateService
  ) {
  }

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
          "answer": this.ss.getA('ucel',0)
        },
        {
          "answer": this.ss.getA('ucel',1)
        },
        {
          "answer": this.ss.getA('ucel',2)
        },
        {
          "answer": this.ss.getA('ucel',3)
        },
        {
          "answer": this.ss.getA('ucel',4)
        },
        {
          "answer": this.ss.getA('ucel',5)
        },
        {
          "answer": this.ss.getA('ucel',6)
        },
        {
          "answer": this.ss.getA('ucel',7)
        },
        {
          "answer": this.ss.getA('ucel',8)
        },
        {
          "answer": this.ss.getA('ucel',9),
          "prompt": "text"
        }
      ],
      "button": this.ss.getA('next')
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
  "button": this.ss.getA('next')
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
      "answer": this.ss.getA('ciel',0)
    },
    {
      "answer": this.ss.getA('ciel',1)
    },
    {
      "answer": this.ss.getA('ciel',2)
    },
    {
      "answer": this.ss.getA('ciel',3)
    },
    {
      "answer": this.ss.getA('ciel',4)
    },
    {
      "answer": this.ss.getA('ciel',5)
    },
    {
      "answer": this.ss.getA('ciel',6)
    },
    {
      "answer": this.ss.getA('ciel',7)
    },
    {
      "answer": this.ss.getA('ciel',8),
      "prompt": "text"
    }
  ],
  "button": this.ss.getA('next')
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
      "answer": this.ss.getA('zaujat',0),
      "recommendation": this.ss.getA('zaujatRcmd',0)
    },
    {
      "answer": this.ss.getA('zaujat',1),
      "recommendation": this.ss.getA('zaujatRcmd',1)
    },
    {
      "answer": this.ss.getA('zaujat',2),
      "recommendation": this.ss.getA('zaujatRcmd',2)
    },
    {
      "answer": this.ss.getA('zaujat',3),
      "recommendation": this.ss.getA('zaujatRcmd',3)
    },
    {
      "answer": this.ss.getA('zaujat',4),
      "recommendation": this.ss.getA('zaujatRcmd',4)
    }
  ],
  "button": this.ss.getA('next')
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
      "answer": this.ss.getA('preco',0)
    },
    {
      "answer": this.ss.getA('preco',1)
    },
    {
      "answer": this.ss.getA('preco',2)
    },
    {
      "answer": this.ss.getA('preco',3)
    },
    {
      "answer": this.ss.getA('preco',4),
      "prompt": "text"
    }
  ],
  "button": this.ss.getA('next')
}

}
