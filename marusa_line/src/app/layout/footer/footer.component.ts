import { Component, OnInit } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent  implements OnInit{
  ngOnInit(): void {
    AOS.init({
      duration: 300,
      easing: 'ease-in-out',
      once: false, 
    });
  }
}
