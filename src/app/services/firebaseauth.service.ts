import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirebaseauthService {

  constructor(public auth: AngularFireAuth,
              private firestore: AngularFirestore) { }
  
  stateAuth(){
    return this.auth.authState;
  }

  

  login(email: string, password:string){
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  logout(){
    this.auth.signOut();
    console.log("Salio con exito");
  }

  async getUid(){
    const user = await this.auth.currentUser;
    if( user === null){
      return null;
    } else {
      return user.uid;
    }
  }

  
}
