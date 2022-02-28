import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { StoreModule } from '@ngrx/store';
import {chatReducer} from './chat/chat.reducers';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InfoScreenComponent } from './info-screen/info-screen.component';
import { UploadScreenComponent } from './upload-screen/upload-screen.component';
import { CredibilityScreenComponent } from './credibility-screen/credibility-screen.component';
import { LanguageSelectionComponent } from './language-selection/language-selection.component';
import { JoinComponent } from './intro/join/join.component';
import { AddDocumentComponent } from './add-document/add-document.component';
import { HttpClientModule } from '@angular/common/http';
import { DefaultLayoutComponent } from './intro/default-layout/default-layout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { Globals } from './globals';
import { EditDocumentComponent } from './edit-document/edit-document.component';
import { ViewDocumentComponent } from './view-document/view-document.component';
import { SummaryComponent } from './summary/summary.component';
import { LoginComponent } from './intro/login/login.component';
import { AnnotationComponent } from './annotation/annotation.component';
import { DocumentsComponent } from './documents/documents.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ButtonQuestionComponent } from './mobile/interaction/button-question/button-question.component';
import { RadioQuestionComponent } from './mobile/interaction/radio-question/radio-question.component';
import { FreeTextQuestionComponent } from './mobile/interaction/free-text-question/free-text-question.component';
import { ExplainedCheckboxesQuestionComponent } from './mobile/interaction/explained-checkboxes-question/explained-checkboxes-question.component';
import { FreeTextCheckboxesQuestionComponent } from './mobile/interaction/free-text-checkboxes-question/free-text-checkboxes-question.component';
import { ExpandableCheckboxesQuestionComponent } from './mobile/interaction/expandable-checkboxes-question/expandable-checkboxes-question.component';
import { httpInterceptorProviders } from './http-interceptors';
import { TermsComponent } from './terms/terms.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { RegisterComponent } from './intro/register/register.component';
import { ChatModule } from './chat/chat.module';

import { WorldState } from './world-state';
import { ChartsModule } from 'ng2-charts';
import { StatisticsTeamComponent } from './statistics-team/statistics-team.component';
import { AllComponent } from './experimental/all/all.component';
import { DisplayUsersComponent } from './data-providers/display-users/display-users.component';
import { DisplayThemesComponent } from './data-providers/display-themes/display-themes.component';
import { DisplayTopicsComponent } from './data-providers/display-topics/display-topics.component';
import { DisplayTrialsComponent } from './data-providers/display-trials/display-trials.component';
import { DisplayParticipantsComponent } from './data-providers/display-participants/display-participants.component';
import { DisplayDocumentsComponent } from './data-providers/display-documents/display-documents.component';
import { DisplayDocumentComponent } from './data-providers/display-document/display-document.component';
import { QuillModule } from 'ngx-quill';
import { TeacherLayoutComponent } from './teacher/teacher-layout/teacher-layout.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { StudentLayoutComponent } from './student/student-layout/student-layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Material
import {
  MatSelectModule, MatButtonModule, MatFormFieldModule, MatInputModule,
  MatRippleModule, MatToolbarModule, MatMenuModule, MatDialogModule,
  MatSidenavModule, MatSliderModule,
  MatIconModule, MatExpansionModule,
  MatCardModule, MatSnackBarModule,
  MatTableModule, MatCheckboxModule, MatBadgeModule, MatProgressSpinnerModule,
  MatListModule} from '@angular/material';

//Translate
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {CustomLoader} from './translation.loader';

import { DialogTermsComponent } from './dialogs/dialog-terms/dialog-terms.component';
import { DialogAboutComponent } from './dialogs/dialog-about/dialog-about.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminThemesComponent } from './admin/admin-themes/admin-themes.component';
import { AdminTopicsComponent } from './admin/admin-topics/admin-topics.component';
import { AdminTrialsComponent } from './admin/admin-trials/admin-trials.component';
import { AdminWelcomeComponent } from './admin/admin-welcome/admin-welcome.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { TeacherProfileComponent } from './teacher/teacher-profile/teacher-profile.component';
import { TeacherWelcomeComponent } from './teacher/teacher-welcome/teacher-welcome.component';
import { TeacherTrialsComponent } from './teacher/teacher-trials/teacher-trials.component';
import { TeacherTopicsComponent } from './teacher/teacher-topics/teacher-topics.component';
import { StudentTrialsComponent } from './student/student-trials/student-trials.component';
import { StudentWelcomeComponent } from './student/student-welcome/student-welcome.component';
import { StudentProfileComponent } from './student/student-profile/student-profile.component';
import { MobileChatComponent } from './mobile/mobile-chat/mobile-chat.component';
import { MultiButtonQuestionComponent } from './mobile/multi-button-question/multi-button-question.component';
import { NewVideoComponent } from './mobile/new-video/new-video.component';
import { LoadingMobileComponent } from './mobile/loading-mobile/loading-mobile.component';
import { MobileLayoutComponent } from './mobile/mobile-layout/mobile-layout.component';
import { VideoPlayerComponent } from './mobile/video-player/video-player.component';
import { FormSettingsComponent } from './templates/form/form-settings/form-settings.component';
import { ChatSettingsComponent } from './templates/chat/chat-settings/chat-settings.component';
import { LogoutComponent } from './intro/logout/logout.component';
import { TeacherNewTopicComponent } from './teacher/teacher-new-topic/teacher-new-topic.component';
import { DialogConfirmExitComponent } from './mobile/dialog-confirm-exit/dialog-confirm-exit.component';
import { ChoosePlayerComponent } from './intro/choose-player/choose-player.component';
import { ChatClimaticSettingsComponent } from './templates/chat/chat-climatic-settings/chat-climatic-settings.component';
import { DocumentAnnotationComponent } from './templates/form/document-annotation/document-annotation.component';
import { DocumentsFormComponent } from './templates/form/documents-form/documents-form.component';
import { DialogActivityComponent } from './dialogs/dialog-activity/dialog-activity.component';
import { DialogStatisticsComponent } from './dialogs/dialog-statistics/dialog-statistics.component';
import { ScaleQuestionComponent } from './mobile/interaction/scale-question/scale-question.component';
import { TeacherActivitiesComponent } from './teacher/teacher-activities/teacher-activities.component';
import { CookiesConsentComponent } from './intro/cookies-consent/cookies-consent.component';
import { ForgotComponent } from './intro/forgot/forgot.component';
import { ResetComponent } from './intro/reset/reset.component';

@NgModule({
  declarations: [
    AppComponent,
    InfoScreenComponent,
    UploadScreenComponent,
    CredibilityScreenComponent,
    LanguageSelectionComponent,
    JoinComponent,
    AddDocumentComponent,
    DefaultLayoutComponent,
    PageNotFoundComponent,
    EditDocumentComponent,
    ViewDocumentComponent,
    SummaryComponent,
    LoginComponent,
    AnnotationComponent,
    DocumentsComponent,
    StatisticsComponent,
    ButtonQuestionComponent,
    RadioQuestionComponent,
    FreeTextQuestionComponent,
    ExplainedCheckboxesQuestionComponent,
    FreeTextCheckboxesQuestionComponent,
    ExpandableCheckboxesQuestionComponent,
    TermsComponent,
    PrivacyComponent,
    RegisterComponent,
    StatisticsTeamComponent,
    AllComponent,
    DisplayUsersComponent,
    DisplayThemesComponent,
    DisplayTopicsComponent,
    DisplayTrialsComponent,
    DisplayParticipantsComponent,
    DisplayDocumentsComponent,
    DisplayDocumentComponent,
    TeacherLayoutComponent,
    AdminLayoutComponent,
    StudentLayoutComponent,
    DialogTermsComponent,
    DialogAboutComponent,
    AdminUsersComponent,
    AdminThemesComponent,
    AdminTopicsComponent,
    AdminTrialsComponent,
    AdminWelcomeComponent,
    AdminProfileComponent,
    TeacherProfileComponent,
    TeacherWelcomeComponent,
    TeacherTrialsComponent,
    TeacherTopicsComponent,
    StudentTrialsComponent,
    StudentWelcomeComponent,
    StudentProfileComponent,
    MobileChatComponent,
    MultiButtonQuestionComponent,
    NewVideoComponent,
    LoadingMobileComponent,
    MobileLayoutComponent,
    VideoPlayerComponent,
    FormSettingsComponent,
    ChatSettingsComponent,
    LogoutComponent,
    TeacherNewTopicComponent,
    DialogConfirmExitComponent,
    ChoosePlayerComponent,
    ChatClimaticSettingsComponent,
    DocumentAnnotationComponent,
    DocumentsFormComponent,
    DialogActivityComponent,
    DialogStatisticsComponent,
    ScaleQuestionComponent,
    TeacherActivitiesComponent,
    CookiesConsentComponent,
    ForgotComponent,
    ResetComponent,
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ChatModule,
    StoreModule.forRoot({
      chat: chatReducer,
    }),
    TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useClass: CustomLoader
        }
    }),
    QuillModule.forRoot({
      suppressGlobalRegisterWarning: true
    }),
    BrowserAnimationsModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatToolbarModule,
    MatMenuModule,
    MatDialogModule,
    MatSidenavModule,
    MatSliderModule,
    MatSnackBarModule,
    MatCardModule,
    MatTableModule,
    MatListModule,
    MatCheckboxModule,
    MatBadgeModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatIconModule
],
  providers: [Globals, httpInterceptorProviders,
  { provide: 'LOCALSTORAGE', useFactory: getLocalStorage }],

  bootstrap: [AppComponent],
  entryComponents: [
    DialogTermsComponent,
    DialogAboutComponent,
    DialogConfirmExitComponent,
    DialogActivityComponent,
    DialogStatisticsComponent,
    CookiesConsentComponent
  ]
})
export class AppModule { }

export function getLocalStorage() {
  return (typeof window !== "undefined") ? window.localStorage : null;
}
