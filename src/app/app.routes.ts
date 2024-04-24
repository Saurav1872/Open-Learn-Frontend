import { Routes } from '@angular/router';
import { HomeComponent } from './core/pages/home/home.component';
import { ErrorPageComponent } from './core/pages/error-page/error-page.component';
import { UserProfileComponent } from './core/pages/user-profile/user-profile.component';
import { LoginComponent } from './core/pages/auth/login/login.component';
import { SignupComponent } from './core/pages/auth/signup/signup.component';
import { ExploreComponent } from './core/pages/explore/explore.component';
import { CourseVisitComponent } from './core/pages/course-visit/course-visit.component';
import { UploadVideoComponent } from './core/components/upload-video/upload-video.component';
import { CoursePlayerComponent } from './core/pages/course-player/course-player.component';
import { CourseVideoFormComponent } from './core/pages/course-video-form/course-video-form.component';
import { BigCourseEditorComponent } from './core/pages/big-course-editor/big-course-editor.component';
import { ProgressComponent } from './core/pages/progress/progress.component';
import { AboutComponent } from './core/pages/about/about.component';
import { BigCourseEditorPanelComponent } from './core/pages/big-course-editor-panel/big-course-editor-panel.component';
export const routes: Routes = [
    {path:'' , component:HomeComponent},
    {path:'upload' , component:UploadVideoComponent},
    {path:'login' , component:LoginComponent},
    {path:'signup' , component:SignupComponent},
    {path:'progress' , component:ProgressComponent},
    {path:'coursePlayer/:courseId' , component:CoursePlayerComponent},
    {path:'about' , component:AboutComponent},
    {path:'user/:userName' , component:UserProfileComponent},
    {path:'explore' , component:ExploreComponent},
    {path:'videoForm' , component:CourseVideoFormComponent},
    {path:'bigCourseEditor' , component:BigCourseEditorComponent},
    {path:'editorPanel' , component:BigCourseEditorPanelComponent},
    {path:'course/:id' , component:CourseVisitComponent},
    {path:'**', pathMatch:'full' , component:ErrorPageComponent},
];