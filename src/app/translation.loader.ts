import { TranslateLoader } from "@ngx-translate/core";
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { cz } from '../locale/cz'
import { sk } from '../locale/sk'
import { en } from '../locale/en'

export class CustomLoader implements TranslateLoader {
    getTranslation(lang: string): Observable<any> {
        switch(lang){
          case "CZ": return of(cz);
          case "EN": return of(en);
          case "SK": return of(sk);
        };
    }
}
