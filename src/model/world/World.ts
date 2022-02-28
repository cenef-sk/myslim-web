import { Anchor } from './Anchor';
import { Activity } from './Activity';

export class World {
  public anchors: Anchor[] = []
  public activities: Activity[] = []

  public participant;
  public hypothesis;
  public showActivities;
  public template;
  //
  //
  public version = "0.0.0";
  public userName = "";
  public state = "";
  public nextState = "";

  public climate = {
    topic: "oteplovanie",
    priorOpinion: "Skôr nesúhlasím"
  };

  priorOpinion = "";
  priorOpinionExplained = "";


  updateParticipant = false;
  saveDocument = false;
  updateDocument = false;

}
