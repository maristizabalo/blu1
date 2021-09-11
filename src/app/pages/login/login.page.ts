import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  passIncorrect:boolean = false;
  pass:number;
  password:number = 2564;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  functionA(){
    if(this.pass == this.password){
      this.router.navigate(['/tabs']);
    }else{
      this.passIncorrect=true;
    }
  return;
  }

}
