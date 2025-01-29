import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { TodoTask } from '../interfaces/task';



@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private firestore: Firestore) { }

  async getTasks(): Promise<TodoTask[]> {
    const tasksCollection = collection(this.firestore, 'tasks');
    const snapshot = await getDocs(tasksCollection);

    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data['title'],
        description: data['description'],
        status: data['status'],
        deadline: data['deadline'],
      } as TodoTask;
    });
  }

  createTask(task: TodoTask): Promise<void> {
    const tasksCollection = collection(this.firestore, 'tasks');
    return addDoc(tasksCollection, task)
      .then(() => console.log('Tâche créée avec succès'))
      .catch((error) => console.error('Erreur lors de la création de la tâche :', error));
  }

  async deleteTask(taskId: string): Promise<void> {
    try {
      const taskDocRef = doc(this.firestore, 'tasks', taskId);
      await deleteDoc(taskDocRef);
      console.log('Tâche supprimée avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche :', error);
    }
  }

  async updateTaskStatus(taskId: string, newStatus: string): Promise<void> {
    try {
      const taskDocRef = doc(this.firestore, 'tasks', taskId);
      await updateDoc(taskDocRef, { status: newStatus });
      console.log(`Statut mis à jour pour la tâche ${taskId} -> ${newStatus}`);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut de la tâche :', error);
    }
  }

}