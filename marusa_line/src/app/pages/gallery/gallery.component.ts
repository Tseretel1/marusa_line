import { CommonModule, NgForOf, PathLocationStrategy } from '@angular/common';
import { Component, OnInit, } from '@angular/core';
import AOS from 'aos';
import { Photo, Post, PostService, ProductTypes } from '../../Repositories/post.service';
import { PhotoAlbumComponent } from '../../shared/components/photo-album/photo-album.component';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule, PhotoAlbumComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements OnInit {
  Cards: Post[] = [];

  constructor(private postService:PostService){
    this.getProductTypes();
  }
  ngOnInit(): void {
    AOS.init({
          easing: 'ease-in-out',
          once: false, 
    });
    this.getAllPosts(0);
  }
  getAllPosts(productId:number){
    this.postService.getPosts(productId).subscribe(
      (resp)=>{
        this.Cards = resp;
      }
    )
  }
  productTypesList :ProductTypes[]= [];
  getProductTypes(){
    this.postService.getProductTypes().subscribe(
      (resp)=>{
        this.productTypesList = resp;
      }
    )
  }
  activeFilterNum:number = 0;
  getPostByFilter(num:number){
    this.activeFilterNum = num;
    this.getAllPosts(num);
  }
}