import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent  implements OnInit{

  @Input() footer!:Footer;
  ngOnInit(): void {
  }
}
// https://www.facebook.com/giorgi.wereteli.33
// https://www.instagram.com/tsereteli__g/
// https://www.tiktok.com/@ts3r00

export interface Footer{
  instagram:string;
  facebook:string;
  tiktok:string;
  shopPhoto:string;
  shopTitle:string;
}