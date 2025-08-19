import { Component, Input, OnInit } from '@angular/core';
import { Cards } from '../cards/cards.component';

@Component({
  selector: 'app-discount-mark',
  imports: [],
  templateUrl: './discount-mark.component.html',
  styleUrl: './discount-mark.component.scss'
})
export class DiscountMarkComponent implements OnInit{
  
  discountedPercentage:number = 0
  ngOnInit(): void {
    this.discountedPercentage = ((this.discount.price - this.discount.discountprice) / this.discount.price) * 100;
    this.discountedPercentage = Math.round(this.discountedPercentage);
    console.log(this.discount)
  }
  @Input() discount!:Cards;
}
export interface Discount{
  price:number;
  DiscountPrice:number;
}