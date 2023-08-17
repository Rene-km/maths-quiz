import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { authGuard } from './user/auth.guard';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'welcome', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  {path: 'learn', loadChildren: () => import('./quiz/quiz.module').then(m => m.QuizModule), canActivate: [authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
