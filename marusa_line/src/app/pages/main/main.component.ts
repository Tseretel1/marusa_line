import { Component, OnInit } from '@angular/core';
import { CardsComponent } from '../../shared/components/cards/cards.component';
import { CommonModule } from '@angular/common';
import AOS from 'aos';
import { Photo, Post, PostService, ProductTypes } from '../../Repositories/post.service';
import { PhotoAlbumComponent, PhotoConfig } from '../../shared/components/photo-album/photo-album.component';
import { DiscountMarkComponent } from '../../shared/components/discount-mark/discount-mark.component';
import { GalleryComponent } from '../gallery/gallery.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { escapeRegExp } from '@angular/compiler';
import { AppRoutes } from '../../shared/AppRoutes/AppRoutes';
import { FormsModule } from "@angular/forms";


@Component({
  selector: 'app-main',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  AppRoutes= AppRoutes;
  soldProducts: Post[] = [];
  user:any = null;
  userId:number = 0;
  constructor(private postService:PostService,private route: ActivatedRoute){
    const user = localStorage.getItem('user');
    if(user){
      this.user =JSON.parse(user);
      this.userId = this.user.Id
    }
    this.postService.getMostSoldProducts(this.userId).subscribe(
      (resp)=>{
        this.soldProducts = resp;
        console.log(resp)
        this.TopShopList = this.generateRandomShops(2);
      }
    )
  }
  ngOnInit(): void {
    window.scrollTo({
     top: 0,
     behavior: 'smooth' 
   });
    AOS.init({
      easing: 'ease-in-out',
      once: false, 
    });
    this.RandomCategories();
    this.shopList = this.generateRandomShops(10);
  }

  PhotoConfig:PhotoConfig={
    likeVisible : true,
    priceVisible :true,
    navigationAvailable : true,
    hoverVisible : true,
    likeCountvisible :false,
  }

  catergorieList:categories[]=[];

  
  selectedCategorie:number = 0;
  selectCategorie(num:number){
    this.selectedCategorie = num; 
  }
  
   shopList: ShopCard[] = [];
   shopProducts: shopProducts[] = [];
   TopShopList: ShopCard[] = [];
   
  RandomCategories() {
    const sampleNames = [
      "საჩუქრები", "ეპოქსიდის მაღაზიები", "პოსტერები", "ხელნაკეთები",
    ];
    this.catergorieList = Array.from({ length: 4 }).map((_, index) => ({
      id: index + 1,
      categoryName: sampleNames[index],
      categoryPhoto: `https://picsum.photos/200?random=${index + 1}` 
    }));
  }

   generateRandomShops(shopCount:number): ShopCard[] {
    const productNames = [
      "Laptop", "Headphones", "Shoes", "T-shirt",
      "Apple", "Phone Case", "Backpack", "Keyboard",
      "Water Bottle", "Sunglasses"
    ];

    const shops: ShopCard[] = [];

    this.soldProducts.forEach(element => {
      const shopProducts:shopProducts={
        id:element.id,
        productPhoto:element.photos[0].photoUrl,
        productName: element.title,
      }
      this.shopProducts.push(shopProducts);
    });
    for(let i =0;i<shopCount;i++){
      shops.push({
        id: 2,
        name: productNames[0],
        logo: `https://picsum.photos/100?random=${Math.random()}`,
        rate: parseFloat((Math.random() * 5).toFixed(1)),
        subscribersCount: parseFloat((Math.random() * 999).toFixed(1)),
        products:this.shopProducts,
      });
    }
    return shops;
  }

  scrollRight(el: HTMLElement) {
  el.scrollBy({ left: el.clientWidth, behavior: 'smooth' });
  }

  scrollLeft(el: HTMLElement) {
    el.scrollBy({ left: -el.clientWidth, behavior: 'smooth' });
  }


  private randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  subscribeChanel(num:number){
    
  }
}



export interface categories{
  id:number;
  categoryName:string;
  categoryPhoto:string;
}

export interface ShopCard{
  id:number;
  name:string;
  logo:string;
  rate:number;
  subscribersCount:number;
  products:shopProducts[];
}

export interface shopProducts{
  id:number;
  productName:string;
  productPhoto?:string|null;
}