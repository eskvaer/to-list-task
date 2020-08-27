import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Tasks } from 'src/app/to-do-list.model';

@Injectable({
  providedIn: 'root'
})
export class ToDoListService {

  constructor(private firestore: AngularFirestore) {}

  getTasks() {
      return this.firestore.collection('tasks').snapshotChanges();
  }

  getTask(taskId) {
      return this.firestore.collection(`tasks/`).doc(taskId).get();
  }

  createTask(task){
      return this.firestore.collection('tasks').add(task);
  }

  updateTask(taskId, task: Tasks){
      this.firestore.collection('tasks').doc(taskId).set(task);
  }

  deleteTask(taskId: string){
      this.firestore.doc('tasks/' + taskId).delete();
  }
}
