import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { User } from '../model/User';
import { Topic } from '../model/Topic';

@Injectable({
  providedIn: 'root'
})
export class MyslimService {
  private usersUrl: string;
  private userIdUrl;
  private userForgotUrl: string;
  private userResetUrl: string;
  private tokenUrl: string;
  private themesUrl: string;
  private topicsUrl: string;
  private trialsUrl: string;
  private joinTrialUrl: string;
  private trialForIdUrl;
  private trialsForTopicUrl;
  private participantsForTrialUrl;
  private documentsForParticipantUrl;
  private documentsForTrialUrl;
  private documentsUrl;
  private participantsUrl;

  constructor(private http: HttpClient) {
    //nvm use v10.23.0
    const API = 'https://kurz.myslim.eu/api/';
    // const API = 'http://127.0.0.1:3010/api/';
    this.usersUrl = API + 'users/';
    this.tokenUrl = API + 'users/token/';
    this.themesUrl = API + 'themes/';
    this.topicsUrl = API + 'topics/';
    this.trialsUrl = API + 'trials/';
    this.joinTrialUrl = this.trialsUrl + 'join/';
    this.trialForIdUrl = (trialId) => (API + 'trials?trialId=' + trialId);
    this.trialsForTopicUrl = (topicId) => (API + 'topics/' + topicId + '/trials/');
    this.participantsForTrialUrl = (trialId) => (API + 'trials/' + trialId + '/participants/');
    this.participantsUrl = (participantId) => (API + 'participants/' + participantId);
    this.documentsForParticipantUrl = (participantId) => (API + 'participants/' + participantId + '/documents/');
    this.documentsForTrialUrl = (trialId) => (API + 'documents/trial/' + trialId);
    this.documentsUrl = (documentId) => (API + 'documents/' + documentId);
    this.userIdUrl = (userId) => (API + 'users/' + userId);
    this.userForgotUrl = this.usersUrl + 'forgot';
    this.userResetUrl = this.usersUrl + 'reset';


  }

  public getToken = (email: string, password: string): Observable<any> => {
    return this.http.post(
      this.tokenUrl,
      {
        email: email.toLowerCase(),
        password: password
      }
    ).pipe(
      map((response: any) => <any>response),
      catchError(this.handleError)
    )
  }

  public getUsers = (): Observable<User> => {
      return this.http.get(this.usersUrl).pipe(
        map((response: any) => <User>response.data),
        catchError(this.handleError)
      )
  }

  public getThemes = (): Observable<any> => {
      return this.http.get(this.themesUrl).pipe(
        map((response: any) => <any>response.data),
        catchError(this.handleError)
      )
  }

  public getTopics = (): Observable<any> => {
      return this.http.get(this.topicsUrl).pipe(
        map((response: any) => <any>response.data),
        catchError(this.handleError)
      )
  }

  public getTopicsForUser = (userId): Observable<any> => {
      return this.http.get(this.topicsUrl + "?userId=" + userId).pipe(
        map((response: any) => <any>response.data),
        catchError(this.handleError)
      )
  }


  public getTrialsForUser = (userId): Observable<any> => {
      return this.http.get(this.trialsUrl + "?userId=" + userId).pipe(
        map((response: any) => <any>response.data),
        catchError(this.handleError)
      )
  }

  public getTrialsForCode = (code): Observable<any> => {
      return this.http.get(this.trialsUrl + "?code=" + code).pipe(
        map((response: any) => <any>response.data),
        catchError(this.handleError)
      )
  }

  public getAllPublicTrials = (): Observable<any> => {
      return this.http.get(this.trialsUrl + "?public=true").pipe(
        map((response: any) => <any>response.data),
        catchError(this.handleError)
      )
  }

  public getTrials = (): Observable<any> => {
      return this.http.get(this.trialsUrl).pipe(
        map((response: any) => <any>response.data),
        catchError(this.handleError)
      )
  }

  public getTrial = (trialId): Observable<any> => {
      return this.http.get(this.trialForIdUrl(trialId)).pipe(
        map((response: any) => <any>response),
        catchError(this.handleError)
      )
  }

  public getParticipant = (participantId): Observable<any> => {
      return this.http.get(this.participantsUrl(participantId)).pipe(
        map((response: any) => <any>response),
        catchError(this.handleError)
      )
  }

  public getDocumentsForTrial = (trialId): Observable<any> => {
      return this.http.get(this.documentsForTrialUrl(trialId)).pipe(
        map((response: any) => <any>response),
        catchError(this.handleError)
      )
  }

  public getTrialsForTopic = (topicId): Observable<any> => {
      return this.http.get(this.trialsForTopicUrl(topicId)).pipe(
        map((response: any) => <any>response),
        catchError(this.handleError)
      )
  }

  public getParticipantsForTrial = (trialId): Observable<any> => {
      return this.http.get(this.participantsForTrialUrl(trialId)).pipe(
        map((response: any) => <any>response),
        catchError(this.handleError)
      )
  }
  public getDocumentsForParticipant = (participantId): Observable<any> => {
      return this.http.get(this.documentsForParticipantUrl(participantId)).pipe(
        map((response: any) => <any>response),
        catchError(this.handleError)
      )
  }

  public createTrialForTopic = (topicId, name, code, publicTrial): Observable<any> => {
      return this.http.post(
        this.trialsForTopicUrl(topicId),
        {name: name, code: code, publicTrial: publicTrial}
      ).pipe(
        map((response: any) => <any>response),
        catchError(this.handleError)
      )
  }

  public createTopic = (
    name: string,
    template: string,
    hypothesis: string,
    introVideo: boolean,
    introCT: boolean,
    questionaire: boolean,
    minNumDocs: number,
    lng: string,
    isPublic: boolean,
  ): Observable<Topic> => {
      return this.http.post(
        this.topicsUrl,
        {
          name: name,
          template: template,
          hypothesis: hypothesis,
          introVideo: introVideo,
          introCT: introCT,
          questionaire: questionaire,
          minNumDocs: minNumDocs,
          'public': isPublic,
          language: lng,

          description: "",
          showActivities: false,
        }
      ).pipe(
        map((response: any) => <Topic>response.data),
        catchError(this.handleError)
      )
  }

  public createUser = (name: string, email: string, password: string): Observable<User> => {
      return this.http.post(
        this.usersUrl,
        {
          name: name,
          email: email.toLowerCase(),
          password: password
        }
      ).pipe(
        map((response: any) => <User>response.data),
        catchError(this.handleError)
      )
  }

  public updateUser = (id: string, password: string, newPassword: string): Observable<any> => {
      return this.http.put(
        this.userIdUrl(id),
        {
          password: password,
          newPassword: newPassword,
        }
      ).pipe(
        map((response: any) => response),
        catchError(this.handleError)
      )
  }

  public forgot = (email: string, lng: string): Observable<any> => {
    return this.http.post(
      this.userForgotUrl,
      {
        email: email,
        lng: lng,
      }
    ).pipe(
      map((response: any) => response),
      catchError(this.handleError)
    )
  }

  public reset = (token: string, password: string): Observable<any> => {
    return this.http.put(
      this.userResetUrl,
      {
        token: token,
        password: password,
      }
    ).pipe(
      map((response: any) => response),
      catchError(this.handleError)
    )
  }

  public joinTrial = (id, name): Observable<any> => {
    console.log(id)
      return this.http.post(
        this.joinTrialUrl ,
        { id: id, name: name}
      ).pipe(
        map((response: any) => <any>response),
        catchError(this.handleError)
      )
  }

  public addDocument = (id, data): Observable<any> => {
    console.log(id)
      return this.http.post(
        this.documentsForParticipantUrl(id) ,
        { data: data}
      ).pipe(
        map((response: any) => <any>response),
        catchError(this.handleError)
      )
  }
  public updateDocument = (document, data): Observable<any> => {
      return this.http.put(
        this.documentsUrl(document._id) ,
        { data: data}
      ).pipe(
        map((response: any) => <any>response),
        catchError(this.handleError)
      )
  }

  public updateParticipant = (_id, data): Observable<any> => {
      return this.http.put(
        this.participantsUrl(_id) ,
        { data: data}
      ).pipe(
        map((response: any) => <any>response),
        catchError(this.handleError)
      )
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(error);
  };

  // private handleError(error: any) {
  //   console.error(error);
  //   return throwError(error.error || 'Server error');
  // }
}
