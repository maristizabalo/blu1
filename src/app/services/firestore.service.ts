import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private database: AngularFirestore) { }

  
  createDoc(data: any, path: string, id: string){
    const collection = this.database.collection(path);
    return collection.doc(id).set(data);
  }

  getDoc(path: string, id: string){
    const collection =  this.database.collection(path);
    return collection.doc(id).valueChanges();
  }

  deleteDoc(path: string, id: string){
    const collection = this.database.collection(path);
    return collection.doc(id).delete();
  }

  updateDoc(data: any, path: string, id: string){
    const collection = this.database.collection(path);
    return collection.doc(id).update(data);
  }

  getId(){
    return this.database.createId();
  }

  getCollection(path: string): Observable<any>{
    return this.database.collection(path, ref => ref.orderBy('id','asc')).snapshotChanges();
    /* return collection.snapshotChanges(); */
  }
}
