import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Huellas } from 'src/app/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';


@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.page.html',
  styleUrls: ['./vehiculo.page.scss'],
})
export class VehiculoPage implements OnInit{

  huellas: any[] = [];
  newHuella: Huellas ={
    id: 0,
    nombre: '',
    fecha: new Date()
  };

  uid= '';
  path = "huellas/";
  registro:boolean = false;

  constructor(public firebaseAuth: FirebaseauthService, public firestore: FirestoreService,private router: Router){ 
    this.firebaseAuth.stateAuth().subscribe(res =>{
      if(res !== null){
        this.uid = res.uid;
        console.log(this.uid);
      }else{
        console.log('No tienes datos');
      }
      this.getHuellas()
    });
  }

  ngOnInit(): void {
    
  }

  getHuellas(){
    const uid = this.firebaseAuth.getUid(); 
    /* const path = 'Usuarios/'+ uid +'/huellas/'; */
    const path = 'Usuarios/'+ this.uid +'/'+ this.path;
    this.firestore.getCollection(path).subscribe(data => {
      console.log(data);
      this.huellas = data;
    })
  }

  guardarHuellas(){
    /* const data = {
      id: this.idn,
      nombre: this.name
    }; */
    const uid = this.firebaseAuth.getUid(); 
    const path = 'Usuarios/'+ uid +'/'+ this.path;
    const id = this.firestore.getId();
    this.firestore.createDoc(this.newHuella, path, id);
  }
  
  logOut(){
    this.firebaseAuth.logout();
    this.router.navigate(['/home']);
  }
  
  
}

