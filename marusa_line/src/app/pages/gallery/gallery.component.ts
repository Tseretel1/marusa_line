import { NgForOf, PathLocationStrategy } from '@angular/common';
import { Component, OnInit, } from '@angular/core';
import AOS from 'aos';
import { Photo, PostService } from '../../Repositories/post.service';

@Component({
  selector: 'app-gallery',
  imports: [NgForOf, PhotoAlbumComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements OnInit {
  gallery: Photo[] = [];

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
    this.postService.getAllPhotos().subscribe(
      (resp)=>{
        this.gallery = resp;
      }
    )
  }
}