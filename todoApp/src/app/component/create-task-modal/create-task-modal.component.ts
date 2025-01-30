import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoTask } from '../../interfaces/task';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class CreateTaskModalComponent {
  @Input() status!: string; // Statut de la colonne
  @Output() taskCreated = new EventEmitter<TodoTask>();
  task: TodoTask = { id: '', title: '', description: '', status: '', deadline: '' };
  isFetchingLocation = false;

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

  async getCurrentLocation() {
    this.isFetchingLocation = true;
    try {
      // Verif des perms
      const permissionStatus = await Geolocation.checkPermissions();

      if (permissionStatus.location !== 'granted') {
        // Demander la perm
        const requestStatus = await Geolocation.requestPermissions();
        if (requestStatus.location !== 'granted') {
          throw new Error('Permission de localisation refusée');
        }
      }

      // Récupérer la position
      const coordinates = await Geolocation.getCurrentPosition();
      this.task.latitude = coordinates.coords.latitude;
      this.task.longitude = coordinates.coords.longitude;
      console.log('Position enregistrée :', this.task.latitude, this.task.longitude);
    } catch (error) {
      console.error('Erreur de géolocalisation :', error);
      alert('Impossible de récupérer la localisation. Vérifiez vos permissions.');
    } finally {
      this.isFetchingLocation = false;
    }
  }
}
