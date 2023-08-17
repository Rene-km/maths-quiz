import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizRoutingModule } from './quiz-routing.module';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { CardComponent } from './quiz-list/card/card.component';


@NgModule({
  declarations: [
    QuizListComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    QuizRoutingModule
  ],
  exports:[
    QuizListComponent
  ]
})
export class QuizModule { }
