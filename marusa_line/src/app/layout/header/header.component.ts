import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  scrollToBottom(): void {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth' 
  });
}

}
