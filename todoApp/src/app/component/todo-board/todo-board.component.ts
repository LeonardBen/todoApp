import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { DocumentReference } from 'firebase/firestore';
import { CreateTaskModalComponent } from '../create-task-modal/create-task-modal.component';
import { TaskCardComponent } from '../task-card/task-card.component';
import { Column } from '../../interfaces/todo';
import { TodoTask } from '../../interfaces/task';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-todo-board',
  templateUrl: './todo-board.component.html',
  styleUrls: ['./todo-board.component.scss'],
  standalone: true,
  imports: [CommonModule, CreateTaskModalComponent, TaskCardComponent, IonicModule],
})
export class TodoBoardComponent {
  columns: Column[] = [];
  showModal = false;
  selectedStatus = '';

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.loadTasks();
  }

  async loadTasks() {
    const tasks = await this.taskService.getTasks();
    this.columns = this.transformTasksIntoColumns(tasks);
  }

  transformTasksIntoColumns(tasks: TodoTask[]): Column[] {
    // console.log('tasks fs :', tasks);

    const columns: Column[] = [
      { status: 'To Do', tasks: [] },
      { status: 'In Progress', tasks: [] },
      { status: 'Done', tasks: [] },
    ];

    tasks.forEach(task => {
      console.log('Tâche actuelle :', task);
      const column = columns.find(col => col.status === task.status);
      if (column) {
        column.tasks.push(task);
      } else {
        console.warn(`Aucune colonne pour la tâche avec le status : ${task.status}`);
      }
    });

    return columns;
  }

  openModal(status: string): void {
    this.selectedStatus = status;
    this.showModal = true;
  }

  onTaskCreated(task: TodoTask | null): void {
    this.showModal = false;
    if (task) {
      const column = this.columns.find((col) => col.status === task.status);
      column?.tasks.push(task);
    }
  }

  deleteTask(column: any, task: TodoTask): void {
    const taskIndex = column.tasks.indexOf(task);
    if (taskIndex > -1) {
      column.tasks.splice(taskIndex, 1);
    }
    this.taskService.deleteTask(task.id);
  }

  onTaskStatusChanged(event: { taskId: string, newStatus: string }): void {
    // Trouver la tâche à mettre à jour
    const task = this.findTaskById(event.taskId);
    if (task) {
      task.status = event.newStatus;
      this.updateColumnForTask(task);
      this.taskService.updateTaskStatus(task.id, event.newStatus);
    }
  }

  private findTaskById(taskId: string): TodoTask | undefined {
    for (const column of this.columns) {
      const task = column.tasks.find(t => t.id === taskId);
      if (task) return task;
    }
    return undefined;
  }

  private updateColumnForTask(task: TodoTask): void {
    // Supprimer la tâche des colonnes actuelles
    for (const column of this.columns) {
      const index = column.tasks.indexOf(task);
      if (index > -1) {
        column.tasks.splice(index, 1);
        break;
      }
    }

    // Ajouter la tâche à la nouvelle colonne
    const column = this.columns.find(col => col.status === task.status);
    if (column) {
      column.tasks.push(task);
    }
  }
}

