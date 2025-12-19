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
  randomShop2!: ShopCard;
  footer!: Footer;
  
  generateRandomFollowers(count: number = 10): Followers[] {
  const names = [
    'alex', 'maria', 'niko', 'luka', 'sophia',
    'giorgi', 'ana', 'dato', 'elene', 'irakli',
    'nina', 'levan', 'tekla', 'sandri', 'keto'
  ];

  return Array.from({ length: count }, (_, i) => ({
    userName: `${names[Math.floor(Math.random() * names.length)]}_${Math.floor(Math.random() * 1000)}`,
    profilePhoto: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`
  }));
}

  createRandomShop(){
    this.randomShop2 ={
        id: 2,
        name:"marusa_handmade",
        logo: `https://picsum.photos/100?random=${Math.random()}`,
        rate: parseFloat((Math.random() * 5).toFixed(1)),
        followerCount: parseFloat((Math.random() * 999).toFixed(0)),
        postCount: parseFloat((Math.random() * 150).toFixed(0)),
        lastFollowers : this.generateRandomFollowers(4),
        products:this.soldProducts,
    };
    this.footer={
      facebook:'',
      instagram:'',
      tiktok:'this.randomShop.tiktok',
      shopPhoto:'this.randomShop.shopPhoto',
      shopTitle:'this.randomShop.shopTitle',
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
  lastFollowers:Followers[];
}