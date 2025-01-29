import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TodoBoardComponent } from './component/todo-board/todo-board.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, TodoBoardComponent],
})
export class AppComponent {
  title = 'todoApp';
}