import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {

  registro:boolean = false;

  constructor(private firebaseAuth: FirebaseauthService,
              private router: Router) { }

  ngOnInit() {
  }

  logOut(){
    this.firebaseAuth.logout();
    this.router.navigate(['/home']);
  }

}
