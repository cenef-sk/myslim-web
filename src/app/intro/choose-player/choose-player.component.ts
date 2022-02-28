import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Globals } from 'src/app/globals';
import { MyslimService } from 'src/app/myslim.service';
import { Router, ActivatedRoute } from '@angular/router';
import { parseJwt } from 'src/utils/token';
import { clearLocal } from 'src/utils/localStorage';

@Component({
  selector: 'app-choose-player',
  templateUrl: './choose-player.component.html',
  styleUrls: ['./choose-player.component.css']
})
export class ChoosePlayerComponent implements OnInit {

  nameFormControl = new FormControl('', []);
  invalidName=false;
  id = null;
  userName = null;

  constructor(
    private globals: Globals,
    private myslimService: MyslimService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject('LOCALSTORAGE') public local,
  ) {
    if (globals.user) {
      this.userName = globals.user.name;
    }
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.globals.trialId = this.id;
  }
  no() {
    clearLocal(this.local);
    this.globals.token = null;
    this.globals.user = null;
    this.userName = null;
  }

  rejoin() {
    // get participantId for userId
    // if () {
    //   this.globals.world.participant = participant
    //   this.router.navigate(['/mobile/loading']);
    //   this.router.navigate(['/mobile']);
    // } else {
      this.join(this.userName)
    // }
  }

  join(userName) {
    let name = userName || this.nameFormControl.value;
    if (name && name.length) {
      this.myslimService.joinTrial(this.id, name).subscribe((data) => {
          const token = data.data.token
          const participant = data.data.participant
          const template = data.data.template
          const hypothesis = data.data.hypothesis
          const showActivities = data.data.showActivities
          console.log(data)
          if (token) {
            this.processToken(token)
          }
          this.globals.world = {
             ...this.globals.world,
             userName: name,
             participant: participant,
             hypothesis: hypothesis,
             showActivities: showActivities,
             template: template
          }
          console.log(participant.topic.template)
          if (participant.topic.template == "form-generic") {
            this.router.navigate(['/form/' + participant._id]);
          } else
          if (participant.topic.introVideo) {
            this.router.navigate(['/mobile/loading']);
            // this.router.navigate(['/mobile']);
          } else
          if (!participant.topic.introVideo) {
            this.router.navigate(['/mobile']);
          }
        },
        err => console.log(err)
      )
    } else {
      this.invalidName = true;
    }
  }


  processToken(token) {
    this.globals.token = token;
    const dToken = parseJwt(this.globals.token);
    this.globals.user = {
      _id: dToken._id,
      name: dToken.name,
      isGuest: dToken.isGuest,
    };
    this.local.setItem('accessToken', this.globals.token);
  }

}
