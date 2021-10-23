import { Component, OnInit } from '@angular/core';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  
  uid= '';

  constructor(public firebaseAuth: FirebaseauthService) {
    this.firebaseAuth.stateAuth().subscribe(res =>{
      if(res !== null){
        this.uid = res.uid;
        console.log(this.uid);
      }else{
        console.log('No tienes datos');
      }
    });
   }

  ngOnInit() {
  }

 
}
