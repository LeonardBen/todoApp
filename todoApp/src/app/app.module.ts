import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { TodoBoardComponent } from './component/todo-board/todo-board.component';

import { TaskCardComponent } from './component/task-card/task-card.component';
import { CreateTaskModalComponent } from './component/create-task-modal/create-task-modal.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppComponent } from './app.component';

@NgModule({

  imports: [
    AppComponent,
    DragDropModule,
    BrowserModule,
    IonicModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    TodoBoardComponent,
    TaskCardComponent,
    CreateTaskModalComponent,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
