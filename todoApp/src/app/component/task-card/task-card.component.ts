import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TodoTask } from '../../interfaces/task';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
  imports: [CommonModule, IonicModule]
})
export class TaskCardComponent {
  @Input() task!: TodoTask;
  @Output() deleteTask = new EventEmitter<void>();
  @Output() taskStatusChanged = new EventEmitter<{ taskId: string, newStatus: string }>();

  isTaskOverdue(task: TodoTask): boolean {
    if (!task.deadline) return false;
    const deadlineDate = new Date(task.deadline).getTime();
    const currentDate = new Date().getTime();
    return deadlineDate < currentDate;
  }

  onDeleteTask(): void {
    this.deleteTask.emit(); // Émet l'événement pour la suppression
  }

  moveToInProgress(): void {// Émet l'événement pour le changement de statut
    this.taskStatusChanged.emit({ taskId: this.task.id, newStatus: 'In Progress' });
  }

  moveToDone(): void {
    this.taskStatusChanged.emit({ taskId: this.task.id, newStatus: 'Done' });
  }
}
