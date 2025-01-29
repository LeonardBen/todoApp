import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoTask } from '../../interfaces/task';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.scss'],
  standalone: true,
  imports: [FormsModule]
})
export class CreateTaskModalComponent {
  @Input() status!: string; // Statut de la colonne
  @Output() taskCreated = new EventEmitter<TodoTask>();
  task: TodoTask = { id: '', title: '', description: '', status: '', deadline: '' };
  // isOpen = true;

  constructor(private taskService: TaskService) { }

  closeModal(): void {
    this.taskCreated.emit(undefined);
  }

  onSubmit(): void {
    this.task.status = this.status;

    this.taskService.createTask(this.task).then(() => {
      this.taskCreated.emit(this.task);
      this.closeModal();
    });
  }
}
