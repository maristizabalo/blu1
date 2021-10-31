import { Component } from '@angular/core';
import {
  AlertController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bluetooth',
  templateUrl: './bluetooth.page.html',
  styleUrls: ['./bluetooth.page.scss'],
})
export class BluetoothPage {
  pairedList: pairedList;
  listToggle: boolean = false;
  pairedDeviceId: number = 0;
  dataSend = '';

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private bluetoothSerial: BluetoothSerial,
    private toastCtrl: ToastController,
    private firebaseAuth: FirebaseauthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.checkBluetoothEnabled();
  }

  logOut() {
    this.firebaseAuth.logout();
    this.router.navigate(['/home']);
  }

  checkBluetoothEnabled() {
    this.bluetoothSerial.isEnabled().then(
      (success) => {
        this.listPairedDevices();
      },
      (error) => {
        this.toastr.warning('Por favor, activa el Bluetooth');
      }
    );
  }
  listPairedDevices() {
    this.bluetoothSerial.list().then(
      (success) => {
        this.pairedList = success;
        this.listToggle = true;
      },
      (error) => {
        this.toastr.info('Al parecer no tienes activo el bluetooth');
        this.listToggle = false;
      }
    );
  }
  selectDevice() {
    let connectedDevice = this.pairedList[this.pairedDeviceId];
    if (!connectedDevice.address) {
      this.toastr.error('Selecciona un dispositivo al que conecterse');
      return;
    }
    let address = connectedDevice.address;
    let name = connectedDevice.name;
    this.connect(address);
  }
  connect(address) {
    this.bluetoothSerial.connect(address).subscribe(
      (success) => {
        this.deviceConnected();
        this.toastr.success('Conectado correctamente');
      },
      (error) => {
        this.toastr.warning('No se ha podido conectar, algo ha fallado.');
      }
    );
  }
  deviceConnected() {
    this.bluetoothSerial.subscribe('\n').subscribe(
      (success) => {
        this.handleData(success);
        this.showToast('Conectado correctamente');
      },
      (error) => {
        this.showError('Ha ocurrido un error al coenctar el dispositvo');
      }
    );
  }
  deviceDisconnect() {
    this.bluetoothSerial.disconnect();
    this.showToast('Se ha desconectado del dispositivo');
  }
  handleData(data) {
    //Montar aquí el sistema para tratar la entrada desde el dispositivo al que nos hemos conectado.
    this.showToast(data);
  }
  sendData(dataToSend: String) {
    this.dataSend = '\n';
    this.dataSend += dataToSend;
    this.bluetoothSerial.write(this.dataSend).then(
      (success) => {
        this.showToast(success);
      },
      (error) => {
        this.showError(error);
      }
    );
  }
  async showError(message) {
    const alert = await this.alertCtrl.create({
      header: '¡Error!',
      message: message,
      buttons: ['Ok'],
    });
    alert.present();
  }
  async showToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 5000,
    });
    toast.present();
  }
}
interface pairedList {
  class: number;
  id: String;
  address: String;
  name: String;
}
