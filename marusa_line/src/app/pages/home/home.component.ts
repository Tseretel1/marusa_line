import { Component, OnInit } from '@angular/core';
import { CardsComponent } from '../../shared/components/cards/cards.component';
import { CommonModule } from '@angular/common';
import AOS from 'aos';
import { Photo, Post, PostService, ProductTypes } from '../../Repositories/post.service';
import { PhotoAlbumComponent, PhotoConfig } from '../../shared/components/photo-album/photo-album.component';
import { DiscountMarkComponent } from '../../shared/components/discount-mark/discount-mark.component';
import { GalleryComponent } from '../gallery/gallery.component';
import { ActivatedRoute } from '@angular/router';
import { escapeRegExp } from '@angular/compiler';
import { Footer, FooterComponent } from '../../layout/footer/footer.component';
import { Followers, ShopCard } from '../main/main.component';




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FooterComponent, GalleryComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  shop: Shop = {
    id: 0,
    name: '',
    logo: null,
    location: null,
    gmail: '',
    subscription: 0,
    instagram: null,
    facebook: null,
    titkok: null
  };

  shopStats: ShopStats={
    productCount :'',
    followerCount :'',
  };

  soldProducts: Post[] = [];
  soldProducts2: Post[] = [];
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
        this.soldProducts = resp.slice(0, 3);
        this.soldProducts2 = resp.slice(3);
      }
    )
    const shopId = this.route.snapshot.paramMap.get('id');
    if(shopId){
      localStorage.setItem('shopId',shopId);
    }
    this.loadShop(Number(shopId));
    this.getShopStats(Number(shopId));
  }
  footer!: Footer;
  
 loadShop(shopId: number): void {
    this.postService.getShopById(shopId).subscribe({
      next: (data: Shop) => {
        this.shop = { ...data };        
      },
    });
  }

  getShopStats(shopId: number): void {
    this.postService.getShopStats(shopId).subscribe(
     (resp) => {
        this.shopStats = resp;
      },
    );
  }


  following:boolean = false;
  followString:string= 'follow'
  toggleFollew(userid:number){
    if(!this.following){
      this.following = true;
      this.followString ='following';
    }
    else{
      this.following = false;
      this.followString ='follow';
    }
  }


  


  PhotoConfig:PhotoConfig={
    likeVisible : true,
    priceVisible :true,
    navigationAvailable : true,
    hoverVisible : true,
    likeCountvisible :false,
  }
}




export interface ShopStats{
  followerCount:string;
  productCount:string;
}

export interface Shop {
  id: number;
  name: string;
  logo: string | null;
  location: string | null;
  gmail: string;
  subscription: number;
  instagram: string | null;
  facebook: string | null;
  titkok: string | null;
}