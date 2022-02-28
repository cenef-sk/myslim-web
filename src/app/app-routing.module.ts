import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultLayoutComponent } from './intro/default-layout/default-layout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { JoinComponent } from './intro/join/join.component';
import { AddDocumentComponent } from './add-document/add-document.component';
import { ViewDocumentComponent } from './view-document/view-document.component';
import { EditDocumentComponent } from './edit-document/edit-document.component';
import { SummaryComponent } from './summary/summary.component';
import { LoginComponent } from './intro/login/login.component';
import { DocumentsComponent } from './documents/documents.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ChatComponent } from './chat/chat/chat.component';
import { RegisterComponent } from './intro/register/register.component';
import { StatisticsTeamComponent } from './statistics-team/statistics-team.component';
import { AllComponent } from './experimental/all/all.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { TeacherLayoutComponent } from './teacher/teacher-layout/teacher-layout.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminThemesComponent } from './admin/admin-themes/admin-themes.component';
import { AdminTopicsComponent } from './admin/admin-topics/admin-topics.component';
import { AdminTrialsComponent } from './admin/admin-trials/admin-trials.component';
import { AdminWelcomeComponent } from './admin/admin-welcome/admin-welcome.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { TeacherWelcomeComponent } from './teacher/teacher-welcome/teacher-welcome.component';
import { TeacherProfileComponent } from './teacher/teacher-profile/teacher-profile.component';
import { TeacherTopicsComponent } from './teacher/teacher-topics/teacher-topics.component';
import { TeacherTrialsComponent } from './teacher/teacher-trials/teacher-trials.component';
import { StudentWelcomeComponent } from './student/student-welcome/student-welcome.component';
import { StudentProfileComponent } from './student/student-profile/student-profile.component';
import { StudentTrialsComponent } from './student/student-trials/student-trials.component';
import { StudentLayoutComponent } from './student/student-layout/student-layout.component';
import { MobileChatComponent } from './mobile/mobile-chat/mobile-chat.component';
import { LoadingMobileComponent } from './mobile/loading-mobile/loading-mobile.component';
import { NewVideoComponent } from './mobile/new-video/new-video.component';
import { MobileLayoutComponent } from './mobile/mobile-layout/mobile-layout.component';
import { VideoPlayerComponent } from './mobile/video-player/video-player.component';
import { LogoutComponent } from './intro/logout/logout.component';
import { TeacherNewTopicComponent } from './teacher/teacher-new-topic/teacher-new-topic.component';
import { ChoosePlayerComponent } from './intro/choose-player/choose-player.component';
import { DocumentAnnotationComponent } from './templates/form/document-annotation/document-annotation.component';
import { DocumentsFormComponent } from './templates/form/documents-form/documents-form.component';
import { TeacherActivitiesComponent } from "./teacher/teacher-activities/teacher-activities.component";
import { ForgotComponent } from "./intro/forgot/forgot.component";
import { ResetComponent } from "./intro/reset/reset.component";

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        component: JoinComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'forgot',
        component: ForgotComponent
      },
      {
        path: 'reset',
        component: ResetComponent
      },
      {
        path: 'logout',
        component: LogoutComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'join/:id',
        component: ChoosePlayerComponent
      },
      {
        path: 'all',
        component: AllComponent
      },
    ]
  },
  {
    path: 'form',
    component: DefaultLayoutComponent,
    children: [
      {
        path: ':id',
        component: DocumentsFormComponent
      },
      {
        path: ':id/annotation',
        component: DocumentAnnotationComponent
      },
    ]
  },
  {
    path: 'mobile',
    component: MobileChatComponent
  },
  {
    path: 'mobile',
    component: MobileLayoutComponent,
    children: [
      {
        path: 'video',
        component: NewVideoComponent
      },
      {
        path: 'player',
        component: VideoPlayerComponent
      },
      {
        path: 'loading',
        component: LoadingMobileComponent
      },
    ]
  },
  {
    path: 'mobile/:id',
    component: MobileChatComponent
  },
  {
  path: 'admin',
  component: AdminLayoutComponent,
  children: [
      {
        path: '',
        component: AdminWelcomeComponent
      },
      {
        path: 'profile',
        component: AdminProfileComponent
      },
      {
        path: 'users',
        component: AdminUsersComponent
      },
      {
        path: 'themes',
        component: AdminThemesComponent
      },
      {
        path: 'topics',
        component: AdminTopicsComponent
      },
      {
        path: 'trials',
        component: AdminTrialsComponent
      },
      {
        path: 'statisticsteam',
        component: StatisticsTeamComponent
      },
      {
        path: '**',
        component: PageNotFoundComponent
      }
    ]
  }, {
  path: 'teacher',
  component: TeacherLayoutComponent,
  children: [
      {
        path: '',
        component: TeacherWelcomeComponent
      },
      {
        path: 'profile',
        component: TeacherProfileComponent
      },
      {
        path: 'topics',
        component: TeacherTopicsComponent
      },
      {
        path: 'activities',
        component: TeacherActivitiesComponent
      },
      {
        path: 'new-topic',
        component: TeacherNewTopicComponent
      },
      {
        path: 'trials',
        component: TeacherTrialsComponent
      },
      {
        path: 'statisticsteam/:id',
        component: StatisticsTeamComponent
      },
      {
        path: 'statisticsteam/:trialId/:id',
        component: DocumentsFormComponent
      },
      {
        path: '**',
        component: PageNotFoundComponent
      }
    ]
  }, {
  path: 'student',
  component: StudentLayoutComponent,
  children: [
      {
        path: '',
        component: StudentWelcomeComponent
      },
      {
        path: 'profile',
        component: StudentProfileComponent
      },
      {
        path: 'trials',
        component: StudentTrialsComponent
      },
      {
        path: 'statisticsteam',
        component: StatisticsTeamComponent
      },
      {
        path: '**',
        component: PageNotFoundComponent
      }
    ]
  }, {
  path: '',
  component: DefaultLayoutComponent,
  children: [
      {
        path: 'chat',
        component: ChatComponent
      },
      {
        path: 'documents',
        component: DocumentsComponent
      },
      {
        path: 'summary',
        component: SummaryComponent
      },
      {
        path: 'statistics',
        component: StatisticsComponent
      },
      {
        path: 'documents/add',
        component: AddDocumentComponent
      },
      {
        path: 'documents/:id/view',
        component: ViewDocumentComponent
      },
      {
        path: 'documents/:id/edit',
        component: EditDocumentComponent
      },
      {
        path: '**',
        component: PageNotFoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
