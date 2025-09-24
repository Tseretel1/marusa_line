import { Component, OnInit } from '@angular/core';
import { AppRoutes } from '../../shared/components/cards/AppRoutes/AppRoutes';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthorizationService } from '../../pages/authorization/authorization.service';
@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private authService:AuthorizationService){

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
}
