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
import { FormsModule, ɵInternalFormsSharedModule } from "@angular/forms";


@Component({
  selector: 'app-order-product',
  imports: [CommonModule, ɵInternalFormsSharedModule,FormsModule],
  templateUrl: './order-product.component.html',
  styleUrl: './order-product.component.scss'
})
export class OrderProductComponent {

  


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
          this.calculatediscountProcentage();
          this.productPrice = this.posts.discountedPrice;
        }
        else{
          this.productPrice = this.posts.price;
        }
        this.oneProductPrice = this.productPrice;
        this.postsLoaded = true;
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
    this.getUserDetails();
  }

  mobileNumber:string = '';
  address:string = '';

  oldMobileNumber:string = '';
  oldAddress:string = '';

  getUserDetails(){
    this.postService.getuserOptionalFields(this.userId).subscribe(
      (resp)=>{
        this.address = resp.location;
        this.mobileNumber = resp.phoneNumber;
        this.oldAddress = this.address;
        this.oldMobileNumber = this.mobileNumber;
        if(this.validateFields()){
           this.nextStep(2);
        }
      }
    )
  }

  discountedPercentage:number = 0
  calculatediscountProcentage(){
    this.discountedPercentage = ((this.posts.price - this.posts.discountedPrice) / this.posts.price) * 100;
    this.discountedPercentage = Math.round(this.discountedPercentage);
    console.log(this.posts)
  }
  bigPhotoVisible = false;
  showBigPhoto(){
    this.bigPhotoVisible = true;
  }
  hideBigPhoto(){
    this.bigPhotoVisible = false;
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
      // Swal.fire({
      //     text: 'შეკვეთა მიღებულია!',
      //     showCancelButton: true,
      //     cancelButtonText:'',
      //     background:'rgba(0, 0, 0, 0.77)',
      //     color: '#00ff4cff',  
      //     showConfirmButton:false,
      // })
      // this.postService.insertOrder(this.userId,this.productId).subscribe(
      //   (resp)=>{
      //   }
      // )
    }
  }

  nextStepNum:number = 1;
  nextStep(num:number){
    this.nextStepNum=num;
  }

  insertMobile(){
    if(this.mobileNumber!=''){
      this.postService.insertPhoneNumber(this.userId, this.mobileNumber).subscribe(
        (resp)=>{
          if(resp==1){
            this.oldMobileNumber = this.mobileNumber;
          }
        }
      )
    }
    else{
      this.mobileNumber = this.oldMobileNumber
    }
  }
  insertLocation(){
    if(this.address!=''){
      this.postService.insertLocation(this.userId, this.address).subscribe(
        (resp)=>{
          if(resp==1){
            this.oldAddress= this.address;
          }
        }
      )
    }
    else{
      this.address = this.oldAddress
    }
  }

  photoVisibleNum:number = 0;
  photoDissapear:boolean =false;
  nextPhoto(){
      this.photoDissapear = true;
      setTimeout(() => {
        this.photoDissapear = false;
      }, 500);
      if(this.photosArray.length==this.photoVisibleNum+1){
        this.photoVisibleNum = 0;
        return;
      }
      this.photoVisibleNum ++;
      return;
  }
  previousPhoto(){
    this.photoDissapear = true;
      setTimeout(() => {
        this.photoDissapear = false;
      },500);
    if(this.photoVisibleNum ==0){
      this.photoVisibleNum = this.photosArray.length-1;
      return;
    }
    this.photoVisibleNum --;
    return;
  }


  mobileInvalid:boolean = false;
  addressInvalid:boolean = false;
  validateFields():boolean{
    if(this.mobileNumber==''){
      this.mobileInvalid = true;
      this.editFieldNum =1;
      setTimeout(() => {
        this.mobileInvalid = false;
      }, 3000);
      return false;
    }
    if(this.address==''){
      this.addressInvalid = true;
      this.editFieldNum =2;
      setTimeout(() => {
        this.addressInvalid = false;
      }, 3000);
      return false;
    }
    this.addressInvalid = false;
    this.mobileInvalid = false;
    return true;

  }
  stepTwo(){
    if(this.validateFields()){
      this.nextStep(2);
    }
  }

  rulesChecked:boolean = false;
  finishOrder(){
    if(this.rulesChecked){
    }
  }
  stepThree(){
    this.nextStep(3);
  }

  editFieldNum:number = 0;
  editField(num:number){
    this.editFieldNum = num;
  }
  closeField(num:number){
    this.editFieldNum = 0;
    if(num==1){
      this.mobileNumber = this.oldMobileNumber;
      return;
    }
    this.address = this.oldAddress;
  }
  acceptField(num:number){
    if(num==1){
      this.insertMobile();
      this.editFieldNum =0;
    }
    else if(num ==2){
      this.insertLocation();
      this.editFieldNum =0;
    }
  }

  productPrice:number = 0;
  oneProductPrice:number = 0;
  productQuantity:number = 1;

  calculatePrice(){
    this.productPrice = this.oneProductPrice * this.productQuantity;
  }
  plusQuantity(){
    if(this.productQuantity<this.posts.quantity){
      this.productQuantity++;
      this.calculatePrice();
    }
  }
  minusQuantity(){
    if(this.productQuantity>=2){
      this.productQuantity--;
      this.calculatePrice();
    }
  }
}
 interface Photo {
  Id?: number;
  photoId?: number;
  photoUrl?: string;
  postId?: number;
}