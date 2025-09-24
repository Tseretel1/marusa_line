import { Component, OnInit } from '@angular/core';
import { CardsComponent } from '../../shared/components/cards/cards.component';
import { CommonModule } from '@angular/common';
import AOS from 'aos';
import { Post, PostService, ProductTypes } from '../../Repositories/post.service';
import { PhotoAlbumComponent } from '../../shared/components/photo-album/photo-album.component';
import { DiscountMarkComponent } from '../../shared/components/discount-mark/discount-mark.component';
import { GalleryComponent } from '../gallery/gallery.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PhotoAlbumComponent, DiscountMarkComponent, GalleryComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  postsFirst: Post[] = [];
  postsSecond: Post[] = [];
  constructor(private postService:PostService){
    this.postService.getDiscountedPosts().subscribe(
      (resp)=>{
        this.postsFirst = resp.slice(0, 3); 
        this.postsSecond = resp.slice(3);
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

}
