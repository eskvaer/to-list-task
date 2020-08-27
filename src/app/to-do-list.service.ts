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

  createTask(task: Tasks){
      return this.firestore.collection('tasks').add(task);
  }

  updateTask(task: Tasks){
      delete task.id;
      this.firestore.doc(`tasks/${ task.id }`).update(task);
  }

  deleteTask(taskId: string){
      this.firestore.doc('tasks/' + taskId).delete();
  }
}
