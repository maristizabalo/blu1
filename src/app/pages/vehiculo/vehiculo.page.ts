import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Huellas } from 'src/app/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ToastrService } from 'ngx-toastr';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';

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

  bluetooth:boolean = false;
  uid= '';
  path = "huellas/";
  registro:boolean = false;
  dataSend: string = "";

  constructor(public firebaseAuth: FirebaseauthService,
              public firestore: FirestoreService,
              private router: Router, 
              private toastr: ToastrService,
              private bluetoothSerial: BluetoothSerial,)
    { 
      this.firebaseAuth.stateAuth().subscribe(res =>{
        if(res !== null){
          this.uid = res.uid;
          console.log(this.uid);
        }else{
          console.log('No tienes datos');
         }
        this.getHuellas();
        this.bluetoothSerial.isConnected().then(res => {
          console.log("BT Conectado");
          this.bluetooth = true;
        },error => {
          console.log("BT No conectado");
          this.bluetooth = false;
        });
      });

      



    }

  ngOnInit(): void {
  }

  getHuellas(){
    const uid = this.firebaseAuth.getUid(); 
    /* const path = 'Usuarios/'+ uid +'/huellas/'; */
    const path = 'Usuarios/'+ uid +'/'+ this.path;

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
    this.dataSend+='\n';
    this.toastr.info(this.dataSend);

    this.bluetoothSerial.write(this.dataSend).then(success => {
      this.toastr.info(success);
      this.firestore.createDoc(this.newHuella, path, id).then(res => {
        this.toastr.success('Guardado!', 'Exioso!');
      })
    }, error => {
      this.toastr.info(error)
    });
    /* this.firestore.createDoc(this.newHuella, path, id).then(res => {
      this.toastr.success('Guardado!', 'Exioso!');
    }).catch(error => {
      this.toastr.error('Error', 'Bad')
    }); */
  }
  
  logOut(){
    this.firebaseAuth.logout();
    this.router.navigate(['/home']);
  }
  
  
}

