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




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PhotoAlbumComponent, FooterComponent, GalleryComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
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
  }
  ngOnInit(): void {
    window.scrollTo({
     top: 0,
     behavior: 'smooth' 
   });
   this.createRandomShop();
  }
  randomShop!: shopObject;
  footer!: Footer;
  createRandomShop(){
    this.randomShop ={
        shopPhoto: 'https://picsum.photos/400/300?random=12',
        shopTitle: 'LumiCraft Studio',
        followerCount: 1287,
        isFollowed: false,
        description: 'Handmade epoxy crafts and home decor made with love.',
        instagram: 'https://instagram.com/lumicraftstudio',
        facebook: 'https://facebook.com/lumicraftstudio',
        tiktok: 'https://tiktok.com/@lumicraftstudio'
    };
    this.footer={
      facebook:this.randomShop.facebook,
      instagram:this.randomShop.instagram,
      tiktok:this.randomShop.tiktok,
      shopPhoto:this.randomShop.shopPhoto,
      shopTitle:this.randomShop.shopTitle,
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

export interface shopObject{
  shopPhoto:string;
  shopTitle:string;
  followerCount:number;
  isFollowed:boolean;
  description:string;
  instagram:string;
  facebook:string;
  tiktok:string;
}