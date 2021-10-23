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
    id: null,
    nombre: '',
    fecha: new Date()
  };

  path = "huellas/";
  uid='';
  registro:boolean = false;

  constructor(public firebaseAuth: FirebaseauthService, public firestore: FirestoreService,private router: Router){ 
                this.firebaseAuth.stateAuth().subscribe(res =>{
                  if(res !== null){
                    this.uid = res.uid;
                  }else{
                    console.log('No tienes datos');
                  }
                });
  }

  ngOnInit(): void {
    this.getHuellas()
  }

  async getHuellas(){
    const uid = await this.firebaseAuth.getUid();
    const path = 'Usuarios/'+ uid +'/huellas';
    this.firestore.getCollection(path).subscribe(data => {
      this.huellas = [];
      data.forEach((element:any) => {
       /* console.log(element.payload.doc.id);
        console.log(element.payload.doc.data()); */
        this.huellas.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.huellas);
    })
  }

  guardarHuellas(){
    /* const data = {
      id: this.idn,
      nombre: this.name
    }; */
    const path = 'Usuarios/'+ this.uid +'/'+ this.path;
    const id = this.firestore.getId();
    this.firestore.createDoc(this.newHuella, path, id);
  }
  
  logOut(){
    this.firebaseAuth.logout();
    this.router.navigate(['/home']);
  }
  
  
}

