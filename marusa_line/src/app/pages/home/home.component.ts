import { Component, OnInit } from '@angular/core';
import { CardsComponent } from '../../shared/components/cards/cards.component';
import { CommonModule } from '@angular/common';
import AOS from 'aos';
import { Post, PostService } from '../../Repositories/post.service';
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

  constructor(private postService:PostService){
    this.postService.getDiscountedPosts().subscribe(
      (resp)=>{
        this.posts = resp;
      }
    )
  }
  posts: Post[] = [];
  
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
