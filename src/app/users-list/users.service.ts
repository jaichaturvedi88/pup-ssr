import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private db: AngularFirestore,
    private firestore: AngularFirestore,
  ) { }

  async initializeUsers() {
    const db = firebase.firestore();
    var batch = db.batch();

    const usersCollecion = db.collection('users');
    const users = await this.getUsers();

    users.forEach(async user => {
      await usersCollecion.add(user);
    });

    // console.log('users1 ', users);
    return batch.commit();
  }

  async getUsers() {

    return await fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => {
        return users;
        // usersCollecion.add(users);
      })
  }

  getAllUsers(): Observable<any> {
    return this.db.collection('users')
      .snapshotChanges()
      .pipe(
        map(snaps => this.convertSnaps(snaps)),
        first());
  }

  convertSnaps(snaps) {
    return snaps.map(snap => {
      return {
        id: snap.payload.doc.id,
        ...snap.payload.doc.data()
      };

    });
  }
}
