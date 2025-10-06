import { Component, OnInit } from '@angular/core';
import { CardsComponent } from '../../shared/components/cards/cards.component';
import { CommonModule } from '@angular/common';
import AOS from 'aos';
import { Post, PostService, ProductTypes } from '../../Repositories/post.service';
import { PhotoAlbumComponent, PhotoConfig } from '../../shared/components/photo-album/photo-album.component';
import { DiscountMarkComponent } from '../../shared/components/discount-mark/discount-mark.component';
import { GalleryComponent } from '../gallery/gallery.component';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PhotoAlbumComponent, DiscountMarkComponent, GalleryComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  discountedFirst: Post[] = [];
  discountedSecond: Post[] = [];
  soldProductsFirst: Post[] = [];
  soldProductsSecond: Post[] = [];
  user:any = null;
  userId:number = 0;
  constructor(private postService:PostService,private route: ActivatedRoute){
    const user = localStorage.getItem('user');
    if(user){
      this.user =JSON.parse(user);
      this.userId = this.user.Id
    }
    this.postService.getDiscountedPosts(this.userId).subscribe(
      (resp)=>{
        this.discountedFirst = resp.slice(0, 3); 
        this.discountedSecond = resp.slice(3);
      }
    )
    this.postService.getMostSoldProducts(this.userId).subscribe(
      (resp)=>{
        this.soldProductsFirst = resp.slice(0, 3); 
        this.soldProductsSecond = resp.slice(3);
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
  }

  PhotoConfig:PhotoConfig={
    likeVisible : true,
    priceVisible :true,
    navigationAvailable : true,
    hoverVisible : true,
    likeCountvisible :false,
  }
}
