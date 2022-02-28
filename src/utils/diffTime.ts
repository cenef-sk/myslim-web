import story from "src/data/smart-stories/climate/climate.json"
import story2 from "src/data/smart-stories/updated-climate/climate.json"
import story3 from "src/data/smart-stories/updated-climate2/climate.json"
import story4 from "src/data/smart-stories/all/climateEN.json"
import story5 from "src/data/smart-stories/all/climateSK.json"
import story6 from "src/data/smart-stories/all/climateCZ.json"


export function diffTime(s, e) {
  let start = new Date(s)
  let end = new Date(e)
  let duration = end.valueOf() - start.valueOf();
  let seconds = Math.floor((duration / (1000)) % 60);
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  let hours = Math.floor(duration / (1000 * 60 * 60));
  let res = ""
  if (seconds) {
    let secondsStr = (seconds<10)?("0" + seconds):("" + seconds);
    res = secondsStr + "s"
  }
  if (minutes) {
    let minutesStr = (minutes<10)?("0" + minutes):("" + minutes);
    res = minutesStr + "m " + res
  }
  if (hours) {
    let hoursStr = (hours<10)?("0" + hours):("" + hours);
    res = hoursStr + "h " + res
  }
  if (!res.length) {
    res = "0s"
  }

  return res;

}

export function timeStamps(labels: string[], ih, version = "1") {
  let stateIds = [];
  let res = []

  let s = story;
  if (version == "2") {
    s = story2
  }
  if (version == "3") {
    s = story5
  }
  // if (version == "4") {
  //   s = story4
  // }
  // if (version == "5") {
  //   s = story5
  // }
  s.sections.forEach(s => {
    if(labels.includes(s.name)) {
      if (s.subSections && s.subSections[0]) {
        let subS = s.subSections[0];
        if (subS.content && subS.content[0]) {
          let para = subS.content[0];
          stateIds = stateIds.concat(para.id)
        }
      }
    }
  })

  ih.forEach((i, index) => {
    if (stateIds.includes(i.stateId)) {
      res = res.concat(i.dateTime);
    }
  })
  return res;
}
