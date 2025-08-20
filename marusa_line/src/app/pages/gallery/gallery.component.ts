import { NgForOf, PathLocationStrategy } from '@angular/common';
import { Component, OnInit, } from '@angular/core';
import AOS from 'aos';
import { Photo, Post, PostService } from '../../Repositories/post.service';
import { PhotoAlbumComponent } from '../../shared/components/photo-album/photo-album.component';

@Component({
  selector: 'app-gallery',
  imports: [NgForOf, PhotoAlbumComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements OnInit {
  Cards: Post[] = [];

  constructor(private postService:PostService){

  }
  ngOnInit(): void {
    AOS.init({
          easing: 'ease-in-out',
          once: false, 
    });
    this.getAllPhotos();
  }
  getAllPhotos(){
    this.postService.getPosts().subscribe(
      (resp)=>{
        this.Cards = resp;
      }
    )
  }
}