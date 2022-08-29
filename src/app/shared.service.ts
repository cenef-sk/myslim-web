import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public lngSelector = true;
  public lngI = 0
  public languages = ["SK", "CZ", "EN"];

  constructor() { }

  setLng(lng){
    console.log(lng)
    let lngI = this.languages.findIndex((lngItem) => lngItem == lng)
    this.lngI = (lngI>=0)?lngI:0;
  }

  getA(name: string, i: number = -1) {
    console.log(this.lngI);
    if(i == -1) {
      return this.trans[name][this.lngI];
    } else {
      return this.trans[name][i][this.lngI];
    }
  }

  getAll(name: string) {
    console.log(this.lngI)
      if(this.trans[name] && Array.isArray(this.trans[name])){
        return this.trans[name].map((item) => item[this.lngI]);
      } else {
        return []
      }
  }

  private trans = {
    next: ["Ďalej", "Další", "Next"],
    ucel: [
      ["Odborné informácie","Odborné informace","Academic information"],
      ["zábava","Zábava","Fun"],
      ["blog","Blog","Blog"],
      ["osobné prezentovanie","Osobní prezentace","Personal marketing"],
      ["spravodajstvo","Zpravodajství","News"],
      ["Propagácia (reklama)","Propagace (reklama)","Marketing (advertisement)"],
      ["diskusné fórum","Diskusní fórum","Discussion forum"],
      ["sociálna sieť","Sociální síť","Social network"],
      ["zastrašovanie","Vyvolání paniky","Causing panic"],
      ["iné","Jiné","Other"],
    ],
    ciel: [
      ["Informovať","Informovat","To inform"],
      ["Pobaviť","Pobavit","To make fun"],
      ["Vyjadriť názor","Vyjádřit názor","To express an opinion"],
      ["Zastrašiť","Zastrašit","To spread fear"],
      ["Vyvolať rozruch","Vyvolat rozruch","To cause panic"],
      ["Propagovať (výrobok, službu, osobnosť, polit. stranu)","Propagovat (výrobek, službu, osobnost, polit. stranu)","To advertise (an item, service, person, political party)"],
      ["Diskutovať","Diskutovat","To discuss"],
      ["Osveta","Osvěta","To enlighten"],
      ["Iné","Jiné","Other"],
    ],
    zaujat: [
      ["Obrázky","Obrázky","Pictures"],
      ["Videá","Videa","Videos"],
      ["Štatistiky","Statistiky","Statistics"],
      ["Clickbaity","Clickbaity","Clickbaits"],
      ["Text a hovorené slovo","Text a mluvené slovo","Text and spoken word"],
    ],
    zaujatRcmd: [
      ["Nad čím sa zamyslieť: aktuálne, neaktuálne, fotografia, ilustrácia, infografika, súvisiace s témou, nesúvisiace s témou.",
      "Nad čím se zamyslet: aktuální, neaktuální, fotografie, ilustrace, infografika, související s tématem, nesouvisející s tématem."  ,
      "What to think about: current, out of date, photography, illustration, infographics, related to the topic, unrelated to the topic."],
      ["Nad čím sa zamyslieť: aktuálne, neaktuálne, animácia, realita, súvisiace s témou, nesúvisiace s témou, reč tela.",
      "Nad čím se zamyslet: aktuální, neaktuální, animace, realita, související s tématem, nesouvisející s tématem, řeč těla."  ,
      "What to think about: current, out of date, animation, reality, related to the topic, unrelated to the topic, body language."],
      ["Často sa nesprávne prezentujú dáta a štatistické výskumy. Bývajú najčastejším zdrojom chýb s veľkým vplyvom na laickú ale i na odbornú verejnosť.",
      "Často se nesprávně prezentují data a statistické průzkumy. Bývají nejčastějším zdrojem chyb s velkým vlivem nejenom na laickou, ale i na odbornou veřejnost."  ,
      "Data and statistical surveys are often misrepresented. They are the most common source of errors with a great impact on the lay but also on the professional public."],
      ["Clickbait je druh textu, ktorý má v prvom rade za cieľ nalákať užívateľa na kliknutie na určitý odkaz, titulok článku či k prehraniu videa.",
      "Clickbait je druh textu, jehož cílem je v první řadě nalákat uživatele, aby klikl na určitý odkaz, titulek článku nebo si přehrál video."  ,
      "Clickbait is a type of text that primarily aims to entice a user to click on a particular link, article title, or video."],
      ["Nad čím sa zamyslieť: citovo zafarbený jazyk, vulgárny jazyk, neodbornosť, hranie na emócie, clickbaity, argumentačné fauly (odkaz v bubline, kde sú informácie k téme).",
      "Nad čím se zamyslet: citově zbarvený jazyk, vulgární jazyk, neodbornost, hraní na emoce, clickbaity, argumentační fauly (odkaz v bublině, kde jsou informace k tématu)."  ,
      "What to think about: emotionally colored language, vulgar language, unprofessionalism, playing emotions, clickbaits, argumentative fouls."],
    ],
    preco: [
      ["Legislatíva (napr. plánujú sa zmeny v zákonoch)", "Legislativa (např. plánují se změny v zákonech)","Legislation (eg changes in laws are planned)"],
      ["Informovanie (napr. uviesť čitateľa do problematiky)", "Informování (např. uvést čtenáře do problematiky)","Informing (eg to introduce the reader to the issue)"],
      ["Propagácia (napr. uvádza sa nový produkt na trh)", "Propagace (např. uvádí se nový produkt na trh)","Promotion (eg a new product is launched)"],
      ["Zvýšenie návštevnosti stránky (napr. clickbaity)", "Zvýšení návštěvnosti stránky (např. clickbaity)","Increase page traffic (e.g. clickbaits)"],
      ["Iné (uveď)", "Jiné (uveď)","Other (specify)"],
    ],
    authorsOpinion: [
      ["Autor úplne súhlasí s tvrdením","Autor úplně souhlasí s tímto tvrzením","Author completely agrees with the statement"],
      ["Autor skôr súhlasí s tvrdením","Autor spíš souhlasí s tímto tvrzením","Author rather agrees with the statement"],
      ["Autor zaujal neutralny postoj k téme","Autor zaujal neutrální postoj k tématu","Author is neutral towards the topic"],
      ["Autor skôr nesúhlasí s tvrdením","Autor spíš nesouhlasí s tímto tvrzením","Author rather disagrees with the statement"],
      ["Autor úplne nesúhlasí s tvrdením","Autor naprosto nesouhlasí s tímto tvrzením","Author totally disagrees with the statement"],
    ],
    myOpinion: [
      ["Úplne súhlasím s autorom","Úplně souhlasím s autorem","I totally agree with the author"],
      ["Skôr súhlasím s autorom","Spíš souhlasím s autorem","I am more likely to agree with the author"],
      ["Skôr nesúhlasím s autorom","Spíš nesouhlasím s autorem","I am more likely to disagree with the author"],
      ["Úplne nesúhlasím s autorom","Naprosto nesouhlasím s autorem","I totally disagree with the author"],
  ],
    moreAuthor: [
      ["Našiel som jeho ďalšiu tvorbu, ale autor sa tejto téme bežne nevenuje","Našel jsem jeho další tvorbu, ale tímto tématem se běžně nezabývá","I´ve found his other work, but the author is not usually involved in this topic"],
      ["Autor sa rovnakej téme venuje dlhšiu dobu","Autor se stejnému tématu věnuje delší dobu","Author is involved in the same topic for a longer time"],
      ["Autora neviem vypátrať","Autora nejsem s to vypátrat","I can´t find the author online"],
      ["Autor je dohľadateľný, ale o jeho činnosti nie je dostatok informácií","Autor je dohledatelný, ale o jeho činnosti není dostatek informací","I can find the author, but there is not enough information about them"],
    ],
    yesno: [
      ["Áno","Ano","Yes"],
      ["Nie","Ne","Not"],
      ["Neviem","Nevím","I do not know"],
    ],
    credibility: [
      ["absolútne nedôveryhodný","absolutně nedůvěryhodný","absolutely untrustworthy"],
      ["nedôveryhodný","nedůvěryhodný","untrustworthy"],
      ["neviem","nevím","don't know"],
      ["dôveryhodný","důvěryhodný","trustworthy"],
      ["absolútne dôveryhodný","absolutně důvěryhodný","absolutely trustworthy"],
    ],

    // ciel: [
      //   ["","",""],
      //   [,,],
      // ],
  }

}
