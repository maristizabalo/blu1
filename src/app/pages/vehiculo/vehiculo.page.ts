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
  
  registro:boolean = false;
  dataSend: string = "";
  /* uid = this.firebaseAuth.getUid(); */
  path = '';
  constructor(public firebaseAuth: FirebaseauthService,
              public firestore: FirestoreService,
              private router: Router, 
              private toastr: ToastrService,
              private bluetoothSerial: BluetoothSerial,)
    { 
      
        
     
        /*this.bluetoothSerial.isConnected().then(res => {
          console.log("BT Conectado");
          this.bluetooth = true;
        },error => {
          console.log("BT No conectado");
          this.bluetooth = false;
        });
      }); */

      



    }

  ngOnInit(): void {
    this.firebaseAuth.stateAuth().subscribe(res =>{
      if(res !== null){
        this.uid = res.uid;
        console.log(this.uid);
        this.path = '/Usuarios/'+ this.uid +'/huellas/'; 
        console.log(this.path);
        this.firestore.getCollection(this.path).subscribe(data => {
          this.huellas = [];
          data.forEach((element:any) => {
            this.huellas.push({
              id: element.payload.doc.id,
              ...element.payload.doc.data()
            })
          });
          console.log(this.huellas)
        })
      }else{
        console.log('No tienes datos');
      }
    });
  }

  getHuellas(){
    /* console.log(this.uid) */
    /* const uid = this.firebaseAuth.getUid(); */
    /* const path = 'Usuarios/'+this.uid+'/huellas/'; */
    /* const path = 'Usuarios/'+ uid +'/huellas/'; */
    /* const path = '/Usuarios/'+ this.uid +'/huellas/'; */

    /* console.log(this.path); */
    /* console.log(path); */
    
    
    /* .getCollection(this.path).subscribe(data => {
      console.log(data);
      this.huellas = data;
    }) */
  }

  registroHuella(){
    this.registro = true;
    this.bluetoothSerial.write("2").then(success => {
      this.toastr.info("Hey que numero de huella?")
    },error =>{

    })
  }

  guardarHuellas(){
    /* const data = {
      id: this.idn,
      nombre: this.name
    }; */
    const uid = this.firebaseAuth.getUid(); 
    const path = this.path;
    const id = this.firestore.getId();
    this.dataSend+='\n';
    this.toastr.info(this.dataSend);

    this.bluetoothSerial.write("").then(success => {
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

  

  
  handleData(data) {
    //Montar aquí el sistema para tratar la entrada desde el dispositivo al que nos hemos conectado.
    this.toastr.info(data);
  }
  
}