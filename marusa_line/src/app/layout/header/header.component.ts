import { Component, OnInit } from '@angular/core';
import { AppRoutes } from '../../shared/components/cards/AppRoutes/AppRoutes';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthorizationService } from '../../pages/authorization/authorization.service';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  constructor(private authService:AuthorizationService){

  }
  AuthSub!:Subscription;
  Authorised:boolean = false;
  ngOnInit(): void {
    this.AuthSub = this.authService.authorized$.subscribe(
      (isVisible) => {
        this.Authorised = isVisible;
        this.getUser();
      }
    );
    const user = localStorage.getItem('user');
    if(user){
      this.Authorised = true;
      this.getUser();
    }
  }

  user:any=null;
  getUser(){
    const user = localStorage.getItem('user');
    if(user){
      this.user= JSON.parse(user);
      console.log(this.user);
    }
  }
  openAuthorization(){
    this.authService.show();
    this.hideSidenav();
  }
  AppRoutes = AppRoutes;
  scrollToBottom(): void {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth' 
    });
    this.hideSidenav();
  }
  scrollTotop(){
     window.scrollTo({ top: 0, behavior: 'smooth' });
     this.hideSidenav();
  }


  sidenavVisible:boolean = false;
  leftToright:boolean = false;
  openSidenav(){
    this.sidenavVisible =  true;
    this.leftToright = false;
  }
  hideSidenav(){
    this.leftToright = true;
    setTimeout(() => {
      this.sidenavVisible =  false;
    }, 500);
  }



  logout(){
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.authService.userNotAuthorized();
    this.user = null;
  }
}
