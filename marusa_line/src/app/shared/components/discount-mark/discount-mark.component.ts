import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../../Repositories/post.service';

@Component({
  selector: 'app-discount-mark',
  imports: [],
  templateUrl: './discount-mark.component.html',
  styleUrl: './discount-mark.component.scss'
})
export class DiscountMarkComponent implements OnInit{
  
  discountedPercentage:number = 0
  ngOnInit(): void {
    this.discountedPercentage = ((this.discount.price - this.discount.discountedPrice) / this.discount.price) * 100;
    this.discountedPercentage = Math.round(this.discountedPercentage);
  }
  @Input() discount!:Post;
}
export interface Discount{
  price:number;
  DiscountPrice:number;
}