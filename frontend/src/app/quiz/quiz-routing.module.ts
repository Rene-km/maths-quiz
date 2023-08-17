import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { authGuard } from '../user/auth.guard';

const routes: Routes = [
  {path: '', component: QuizListComponent, canActivate: [authGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
