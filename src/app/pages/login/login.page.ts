import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email:string;
  password:string;
  
  passIncorrect:boolean = false;
  /* pass:number;
  password:number = 2564; */

  constructor(private router: Router,
              public firebaseAuth: FirebaseauthService,
              ) { }

  async ngOnInit() {
    const uid = await this.firebaseAuth.getUid();
    /* console.log(uid); */

    if(uid!==null){
      this.router.navigate(['/tabs']);
    }
  }

  login(){
    this.firebaseAuth.login(this.email, this.password).then(()=>{
      this.router.navigate(['/tabs']);
    })
  }

  logOut(){
    this.firebaseAuth.logout();
  }



  /* functionA(){
    if(this.pass == this.password){
      this.router.navigate(['/tabs']);
    }else{
      this.passIncorrect=true;
    }
  return;
  } */

}
