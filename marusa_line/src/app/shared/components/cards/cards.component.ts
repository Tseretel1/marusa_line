import { Component, Input, OnInit } from '@angular/core';
import AOS from 'aos';

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
  name:string;
  price:number;
  Discountprice:number;
  description:string;
  viewCount:number;
  photoUrl:string;
}