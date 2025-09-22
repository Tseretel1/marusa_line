import { Component, OnInit } from '@angular/core';
import { Post, PostService } from '../../Repositories/post.service';
import { ActivatedRoute } from '@angular/router';
import { elementAt } from 'rxjs';
import { CommonModule, NgFor } from '@angular/common';
import { DiscountMarkComponent } from "../../shared/components/discount-mark/discount-mark.component";
import * as  AOS from 'aos';
import { Conditional } from '@angular/compiler';
@Component({
  selector: 'app-card-details',
  imports: [CommonModule, DiscountMarkComponent],
  templateUrl: './card-details.component.html',
  styleUrl: './card-details.component.scss'
})
export class CardDetailsComponent implements OnInit{

  id:number = 0;
  posts:Post = {} as Post;
  photosArray:Photo[]= [];
  postsLoaded:boolean = false;
  constructor(private postService:PostService, private route :ActivatedRoute){
    const id = this.route.snapshot.paramMap.get('id');
    this.id = Number(id);
    this.postService.getPostWithId(this.id).subscribe(
      (resp)=>{
        this.posts = resp[0];
        this.posts.photos.forEach(item => {
          this.photosArray.push(item);
        });
        if(this.posts.discountedPrice!=null&& this.posts.discountedPrice>0){
          this.postsLoaded = true;
        }
      }
    );
  }
  ngOnInit(): void {
    AOS.init({
      easing: 'ease-in-out',
      once: false, 
    });
    // const loop = () => {
    //   this.nextPhoto();
    //   setTimeout(loop, 5000); 
    // };
    // loop(); 
  }
  photoVisibleNum:number = 0;
  nextPhoto(){
      if(this.photosArray.length==this.photoVisibleNum+1){
        this.photoVisibleNum = 0;
        return;
      }
      this.photoVisibleNum ++;
      return;
  }
  previousPhoto(){
    if(this.photoVisibleNum ==0){
      this.photoVisibleNum = this.photosArray.length-1;
      return;
    }
    this.photoVisibleNum --;
    return;
  }

  getOnTheClickedPhoto(num:number){
    this.photoVisibleNum = num;
  }
}
 interface Photo {
  Id?: number;
  photoId?: number;
  photoUrl?: string;
  postId?: number;
}