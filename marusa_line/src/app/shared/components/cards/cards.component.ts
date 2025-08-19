import { Component, Input, OnInit } from '@angular/core';
import AOS from 'aos';
import { AppRoutes } from './AppRoutes/AppRoutes';
@Component({
  selector: 'app-cards',
  imports: [],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent implements OnInit{
  ngOnInit(): void {
  }
  @Input() cards!:Cards;
}

export interface Cards{
  id:number
  name:string;
  price:number;
  discountprice:number;
  description:string;
  viewCount:number;
  photoUrl:string;
}