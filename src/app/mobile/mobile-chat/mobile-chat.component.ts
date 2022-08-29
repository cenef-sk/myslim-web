import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, HostListener, Inject } from '@angular/core';
import { Message } from 'src/model/Message';
import { render } from 'src/utils/rendering';
import { Globals } from 'src/app/globals';
import { Router } from '@angular/router';
import { DialogConfirmExitComponent } from '../dialog-confirm-exit/dialog-confirm-exit.component';
import { MatDialog } from '@angular/material';
import { MyslimService } from 'src/app/myslim.service';
import { World } from "src/model/world/World";
import { DialogActivityComponent } from "src/app/dialogs/dialog-activity/dialog-activity.component";
import { SmartStoryEngine } from 'smartstoryengine/dist/app/SmartStoryEngine';
import { Message as MessageInteraction } from 'smartstoryengine/dist/app/interaction-model/Message';
import { UserDecision } from 'smartstoryengine/dist/app/interaction-model/UserDecision';
import { UserInteraction } from 'smartstoryengine/dist/app/interaction-model/UserInteraction';
import { EndOfStory } from 'smartstoryengine/dist/app/interaction-model/EndOfStory';
import story from "src/data/smart-stories/updated-climate2/climate.json"
import storySK from "src/data/smart-stories/all/climateSK.json"
import storyEN from "src/data/smart-stories/all/climateEN.json"
import storyCZ from "src/data/smart-stories/all/climateCZ.json"
import { TranslateService } from "@ngx-translate/core";

const WRITING_DELAY = 2500; // check how it works
const BEFORE_WRITING_DELAY = 1500;

// types of user interaction
const EXPLAINED_CHECK_QUESTION = "EXPLAINED_CHECK_QUESTION";
const FREE_TEXT_CHECK_QUESTION = "FREE_TEXT_CHECK_QUESTION";
const RADIO_QUESTION = "RADIO_QUESTION";
const OPTIONS = "OPTIONS"
const FREE_TEXT_QUESTION = "FREE_TEXT_QUESTION"
const EXPAND_CHECK_QUESTION = "EXPAND_CHECK_QUESTION"
const SCALE_QUESTION = "SCALE_QUESTION"

const EMOJI = {
  // smile: "1F600.png",
  normal_smile: "1F642.png",
  // sad: "1F612.png",
  sad_smile: "1F61F.png",
  laugh_smile: "1F600.png",
  think_smile: "1F914.png",
  // angry: "1F624.png",
  // fox: "1F98A.png",
  // ant: "1F41C.png"
}

@Component({
  selector: 'app-mobile-chat',
  templateUrl: './mobile-chat.component.html',
  styleUrls: ['./mobile-chat.component.css'],
  // encapsulation: ViewEncapsulation.None,
})
export class MobileChatComponent implements OnInit {

  @ViewChild('chatContainer') chatContainer: ElementRef;

  testEnvironment = false;
  documents = []

  photoGoogle = "https://lh3.googleusercontent.com/a-/AOh14GjZcsZhyzHb-oe-PpYQW2FLMaqqXr01PJX_qDYFwQ=s96-c"
  photoMe = "/assets/tomas.png"
  photoYou = "/assets/your_avatar2.png"

  photo(isMe) {
    if(!isMe) {
      return this.photoMe
    } else {
      // if (this.photoGoogle) {
        // return this.photoGoogle
      // } else {
        return this.photoYou
      // }
    }
  }

  // define available senders
  public ME = "me"
  public HE = "tomas"
  // // chat history is just storage for messages - should be not used to store answers
  public chatHistory: Message[] =[]

  engine
  // asynchronous tasks should be resolved
  toResolve = null;
  trial

  name = "";

  constructor(
    private router: Router,
    private globals: Globals,
    private myslimService: MyslimService,
    public dialog: MatDialog,
    private translate: TranslateService,
    @Inject('LOCALSTORAGE') public local,
  ) {
  }

  public languages = ["SK", "CZ", "EN"];

  setLanguage(){
    let savedLocale = this.local.getItem('locale');
    if (savedLocale) {
      this.translate.use(savedLocale);
    }
  }

  //TODO check if
  preventExit(event) {
    event.returnValue = "Po odchode z tejto stránky, kurz začne od začiatku. Naozaj si prajete opustiť kurz?";
  }
  ngOnDestroy() {
    window.removeEventListener('beforeunload', this.preventExit, false);
  }
  ngOnInit() {
    window.addEventListener('beforeunload', this.preventExit);
    this.setLanguage();


      //TODO remove if correctly exited.

      let localTrialId = this.local.getItem('trialId');
      let localChatHistory = null;
      let localSmartStoryEngine = null;
      console.log(localTrialId);
      if (!this.globals.trialId) {
        if (localTrialId) {
          this.globals.trialId = localTrialId;
          localChatHistory = JSON.parse(this.local.getItem('chatHistory'));
          localSmartStoryEngine = JSON.parse(this.local.getItem('smartStoryEngine'));
          this.globals.world = JSON.parse(this.local.getItem('world'));

          this.documents = JSON.parse(this.local.getItem('documents'));
          this.prevDocNum = this.local.getItem('prevDocNum');
          // console.log(JSON.stringify(localChatHistory));
          // console.log(localSmartStoryEngine);
        }
      } else {
        this.local.setItem('trialId', this.globals.trialId);
      }

      console.log(this.globals.trialId)

      if (this.globals.trialId) {
        this.myslimService.getTrial(this.globals.trialId).subscribe((data) => {
          if(data.data && data.data.length == 1) {
            this.trial = data.data[0];
            let topic = this.trial.topic;

            if (topic.language == "en") {
              this.engine = SmartStoryEngine.tellTheStory(storyEN);
            } else if (topic.language == "cz") {
              this.engine = SmartStoryEngine.tellTheStory(storyCZ);
            } else if (topic.language == "sk") {
              this.engine = SmartStoryEngine.tellTheStory(storySK);
            } else {
              this.engine = SmartStoryEngine.tellTheStory(story);
            }
            // let template = this.globals.world.template
            // let hypothesis = this.globals.world.hypothesis
            let name = this.globals.world.userName
            this.name = name;

            if (topic.template == "chat-generic"){
              this.engine.world.setVariable("theme_name", "general")
            } else {
              this.engine.world.setVariable("theme_name", "climate")
            }
            this.engine.world.setVariable("hypothesis", topic.hypothesis)
            this.engine.world.setVariable("skip_intro", !topic.introCT)
            this.engine.world.setVariable("skip_questionaire", !topic.questionaire)
            this.engine.world.setVariable("min_doc_num", topic.minNumDocs)
            this.engine.world.setVariable("name", name)
            this.engine.world.setVariable("doc_num", 0)
            //hack: used to check if new doc is cerated.
            // this.prevDocNum = 0;

            if (localChatHistory && localSmartStoryEngine) {
              this.chatHistory = localChatHistory;
              this.engine.load(localSmartStoryEngine)
            }

            this.chat()
            this.scrollToBottom();
          }
        })
      } else {
        console.log("trialId is not saved in globals")
        this.router.navigate(["/"]);
      }

  }

  ngAfterViewChecked() {
      this.scrollToBottom();
  }

  scrollToBottom(): void {
      try {
          this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
      } catch(err) { }
  }

  prevDocNum = 0
  checkEngineAndSave() {
    let docNum = this.engine.world.getVariable("doc_num");
    if (docNum > this.prevDocNum) {
        // save DOCUMENT HERE
        let document = this.engine.world.getVariable("document")
        this.doSavings(document, true); // save also interaction
        this.engine.world.setVariable("document", {})
        this.prevDocNum = docNum;
    }
  }

  chat() {
    if (this.engine.hasNext()) {
      this.saveLocal();
      let next = this.engine.next();
      this.checkEngineAndSave()
      if (next instanceof EndOfStory) {
        console.log("StoryEnded");
        this.doSavings(null, true);
        // this.globals.world = new World();
        this.router.navigate(["/form/" + this.globals.world.participant._id,]);
        return;
      }
      while (next instanceof MessageInteraction && next.message.trim().length == 0) {
        next = this.engine.next();
      }
      while(next instanceof MessageInteraction && next.message.trim().endsWith("<>")) {
        let newNextNode = this.engine.next();
        next.message = next.message.trim().slice(0, -2) + "<br>" + newNextNode.message;
        if (!newNextNode.message.trim().endsWith("<>")){
          break;
        }
      }

      this.userInteraction(next).then((data) => {
        // do something with engine
        console.log(data)
        this.chat();
      })
    } else {
      this.local.removeItem("trialId")
      this.local.removeItem("chatHistory")
      this.local.removeItem("smartStoryEngine")
      this.local.removeItem("documents")
      this.local.removeItem("prevDocNum")
      console.log("CHAT ENDED");
    }
  }


    replaceEmoji(text) {
      let splited = text.split(":");
      let img = (fileName) => "<img class='test' height='32px' src= 'assets/OpenMojis/" + fileName + "' >"
      let res = splited.reduce((prev, curr, index)=> {
        if(index == 0) {
          return curr;
        }
        if (index == splited.length - 1) {
          return prev + curr;
        }
        if (EMOJI[curr]) {
          return prev + img(EMOJI[curr])
        } else {
          return prev + ":" + curr
        }
      }, "")
      return res;
    }


  userInteraction(next) {
    return new Promise((resolve, reject) => {
      if (next instanceof MessageInteraction) {
        setTimeout(() => {
          this.typing = true;
          setTimeout(() => {
            console.log(next.tags)
            if (next.tags && next.tags.includes("img")){
              this.chatHistory = this.chatHistory.concat(
                new Message(this.HE, "<img width='100%' src= '/assets/" + next.message + "'>")
              )
            } else {
              let res = this.replaceEmoji(next.message)
              this.chatHistory = this.chatHistory.concat(
                new Message(this.HE, res)
              )
            }
            this.typing = false;
            resolve("DONE")
              }, WRITING_DELAY)
        }, BEFORE_WRITING_DELAY)

      }
      if (next instanceof UserDecision) {
        setTimeout(() => {
          this.hidePrompt = false;
          this.inputType = OPTIONS;
          this.question = next.options.map((i) => this.replaceEmoji(i));
          this.typing = false;
          this.toResolve = resolve;
        }, BEFORE_WRITING_DELAY)
      }
      if (next instanceof UserInteraction) {
        if (next.json.type == "wait") {
          setTimeout(() => {
            this.typing = false;
            this.engine.provideAnInput(null);
            resolve("WAITED");
          }, next.json.duration * 1000);
        } else {
          setTimeout(() => {
            this.hidePrompt = false;
            switch(next.json.type) {
              case "radio":
                this.inputType = RADIO_QUESTION
                break;
              case "explained-check":
                this.inputType = EXPLAINED_CHECK_QUESTION
                break;
              case "free-text-check":
                this.inputType = FREE_TEXT_CHECK_QUESTION
                break;
              case "text":
                this.inputType = FREE_TEXT_QUESTION
                break;
              case "expand-check":
                this.inputType = EXPAND_CHECK_QUESTION
                break;
              case "scale":
                this.inputType = SCALE_QUESTION
                break;
            }
            this.question = next.json;
            this.typing = false;
            this.toResolve = resolve;
          }, BEFORE_WRITING_DELAY)
        }
      }
    });
  }

  // // START check instances of questions
    isOptions(){
      return this.inputType == OPTIONS;
    }
    isRadioQuestion(){
      return this.inputType == RADIO_QUESTION;
    }
    isExplainedCheckboxesQuestion(){
      return this.inputType == EXPLAINED_CHECK_QUESTION;
    }
    isFreeTextCheckboxesQuestion(){
      return this.inputType == FREE_TEXT_CHECK_QUESTION;
    }

    isFreeTextQuestion(){
      return this.inputType == FREE_TEXT_QUESTION;
    }

    isExpandableCheckboxesQuestion(){
      return this.inputType == EXPAND_CHECK_QUESTION;
    }
    isScaleQuestion(){
      return this.inputType == SCALE_QUESTION;
    }

  // // END check instances of questions
  //
  //
  hidePrompt = true;
  inputType = null;
  typing = false;
  question = null;
  //
  onAnswer(answer: any) {
    console.log(answer)
    let res;
    if (this.isOptions()) {
      res = this.engine.makeAChoice(answer);
    } else {
      if(this.isRadioQuestion()) {
        if (answer.value) {
          this.engine.provideAnInput(answer.value);
        }
        if (answer.response) {
          res = answer.response;
        }
      } else if (this.isExplainedCheckboxesQuestion()) {
        this.engine.provideAnInput(answer[0]);
        res = "Moje správne odpovede: " + answer[1]
        console.log(this.engine.save())
      } else if (this.isFreeTextCheckboxesQuestion()) {
        this.engine.provideAnInput(answer[0]);
        res = answer[1]
        console.log(this.engine.save())
      } else if (this.isFreeTextQuestion()) {
        this.engine.provideAnInput(answer);
        console.log(this.engine.world)
        res = answer
        console.log(this.engine.save())
      } else if (this.isExpandableCheckboxesQuestion()) {
        this.engine.provideAnInput(answer[0]);
        console.log(this.engine.world)
        res = answer[1]
        console.log(this.engine.save())
      } else if (this.isScaleQuestion()) {
        this.engine.provideAnInput(answer[0]);
        console.log(this.engine.world)
        res = answer[1]
        console.log(this.engine.save())
      }
    }

    if (this.toResolve) {
      // TODO engine answer userInput. setUserInput, ....
      this.toResolve(res);
      this.hidePrompt = true;
      this.inputType = null;
      this.question = null;
      if (res && res.trim()){
        this.chatHistory = this.chatHistory.concat(new Message(this.ME, this.replaceEmoji(res)));
      }
    }
  }
  //
  doSavings(document, saveInteraction) {
    if (saveInteraction) {
      let w = this.globals.world
      let data = {
        interactionHistory: this.engine.world.interactionHistory,
        questionaire: this.engine.world.state.questionaire,
        intro: this.engine.world.state.intro,
        version: "3"
      }
      this.myslimService.updateParticipant(
        w.participant._id,
        data
      ).subscribe((participant) => {
        console.log(participant)
      },
        err => console.log(err)
      )
    }
    if (document) {
      this.documents = this.documents.concat({url: document.url})
      let w = this.globals.world
      this.myslimService.addDocument(
        w.participant._id,
        document
      ).subscribe((data) => {
        console.log(data)
      },
      err => console.log(err)
      )
    }
  }


  exit(): void {
    const dialogRef = this.dialog.open(DialogConfirmExitComponent, {
      width: '400px'
    });
    //TODO delete locals
  }

  saveLocal() {
    this.local.setItem('chatHistory', JSON.stringify(this.chatHistory));
    this.local.setItem('smartStoryEngine', JSON.stringify(this.engine.save()));
    this.local.setItem('documents', JSON.stringify(this.documents));
    this.local.setItem('prevDocNum', this.prevDocNum);
    this.local.setItem('world', JSON.stringify(this.globals.world));
  }
}
