import { Component } from '@angular/core';
import { AuthorizationService } from '../authorization/authorization.service';
import { RouterLink } from '@angular/router';
import { AppRoutes } from '../../shared/AppRoutes/AppRoutes';
@Component({
  selector: 'app-profile',
  imports: [RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  constructor(private authService:AuthorizationService){
    
  }

  AppRoutes=AppRoutes;
  logout(){
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.authService.userNotAuthorized();
  }
}
