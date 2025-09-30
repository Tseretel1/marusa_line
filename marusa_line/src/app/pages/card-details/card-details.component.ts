import { Component, HostListener, OnInit } from '@angular/core';
import { Post, PostService } from '../../Repositories/post.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { elementAt } from 'rxjs';
import { CommonModule, NgFor } from '@angular/common';
import { DiscountMarkComponent } from "../../shared/components/discount-mark/discount-mark.component";
import * as  AOS from 'aos';
import { Conditional } from '@angular/compiler';
import { AuthorizationService } from '../authorization/authorization.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-card-details',
  imports: [CommonModule],
  templateUrl: './card-details.component.html',
  styleUrl: './card-details.component.scss'
})
export class CardDetailsComponent implements OnInit{

  productId:number = 0;
  posts:Post = {} as Post;
  photosArray:Photo[]= [];
  postsLoaded:boolean = false;

  user:any = null;
  userId:number = 0;
  constructor(private postService:PostService, private route :ActivatedRoute,private authServise:AuthorizationService){
    const id = this.route.snapshot.paramMap.get('id');
    this.productId = Number(id);
    const user = localStorage.getItem('user');
    if(user){
      this.user =JSON.parse(user);
      this.userId = this.user.Id
    }
    this.postService.getPostWithId(this.productId,this.userId).subscribe(
      (resp)=>{
        this.posts = resp[0];
        this.posts.photos.forEach(item => {
          this.photosArray.push(item);
        });
        if(this.posts.discountedPrice!=null&& this.posts.discountedPrice>0){
          this.postsLoaded = true;
          this.calculatediscountProcentage();
        }
      }
    );
  }
  ngOnInit(): void {
    AOS.init({
      easing: 'ease-in-out',
      once: false, 
    });
    window.scrollTo({
     top: 0,
     behavior: 'smooth' 
   });
    // const loop = () => {
    //   this.nextPhoto();
    //   setTimeout(loop, 5000); 
    // };
    // loop(); 
  }
  discountedPercentage:number = 0
  calculatediscountProcentage(){
    this.discountedPercentage = ((this.posts.price - this.posts.discountedPrice) / this.posts.price) * 100;
    this.discountedPercentage = Math.round(this.discountedPercentage);
    console.log(this.posts)
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

  bigPhotoVisible = false;
  showBigPhoto(){
    this.bigPhotoVisible = true;
  }
  hideBigPhoto(){
    this.bigPhotoVisible = false;
  }


  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      this.previousPhoto();
    } else if (event.key === 'ArrowRight') {
      this.nextPhoto();
    }
    else if (event.key === 'Escape') {
      this.hideBigPhoto();
    }
  }

  isUserLogged(){
    const user = localStorage.getItem('user');
    if(user){
      return true;
    }
    this.authServise.show();
    return false;
  }

  insertOrder(){
    if(this.isUserLogged()){
      Swal.fire({
          text: 'შეკვეთა მიღებულია!',
          showCancelButton: true,
          cancelButtonText:'',
          background:'rgba(0, 0, 0, 0.77)',
          color: '#00ff4cff',  
          showConfirmButton:false,
      })
      this.postService.insertOrder(this.userId,this.productId).subscribe(
        (resp)=>{
        }
      )
    }
  }
}
 interface Photo {
  Id?: number;
  photoId?: number;
  photoUrl?: string;
  postId?: number;
}