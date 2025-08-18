import { Component, OnInit } from '@angular/core';
import { AppRoutes } from '../../shared/components/cards/AppRoutes/AppRoutes';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  AppRoutes = AppRoutes;
  scrollToBottom(): void {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth' 
  });
}

}
