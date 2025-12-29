import { Component, OnInit } from '@angular/core';
import { AppRoutes } from '../../shared/AppRoutes/AppRoutes';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthorizationService } from '../../pages/authorization/authorization.service';
import { Subscription } from 'rxjs';
import { ReloadService } from '../../shared/services/ReloadService';
@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  constructor(private authService:AuthorizationService, private route :Router,private reloadService:ReloadService){

  }
  AuthSub!:Subscription;
  ReloadSub!:Subscription;
  Authorised:boolean = false;
  ngOnInit(): void {
    this.authService.isUserAuthorised();
    this.AuthSub = this.authService.authorized$.subscribe(
      (isVisible) => {
        if(isVisible){
          this.Authorised = isVisible;
          this.getUser();
        }
        else{
          this.Authorised = isVisible;
          this.user = null;
        }

      }
    );
    this.ReloadSub= this.reloadService.alert$.subscribe(
      (e)=>{
        this.getUser();
      }
    )
  }

  user:any=null;
  userPhoto:string ='';
  getUser(){
    const user = localStorage.getItem('user');
    if(user){
      this.user = JSON.parse(user);
      this.userPhoto = this.user.Picture;
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

  goTospecialRoute(){
    const shopRoute = localStorage.getItem('shopId');
    if(shopRoute){
      this.route.navigate([AppRoutes.shop + Number(shopRoute)]);
    }
    this.scrollTotop();
  }

  
}
