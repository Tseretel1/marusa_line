import { Component, HostListener, OnInit } from '@angular/core';
import { orderStatuses, Post, PostService } from '../../Repositories/post.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, DatePipe, NgFor } from '@angular/common';
import * as  AOS from 'aos';
import { AuthorizationService } from '../authorization/authorization.service';
import Swal from 'sweetalert2';
import { FormsModule, ɵInternalFormsSharedModule } from "@angular/forms";


@Component({
  selector: 'app-order-details',
  imports: [CommonModule,FormsModule,DatePipe],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent {

  


  productId:number = 0;
  posts:Post = {} as Post;
  order:OrderDetailsDto = {} as OrderDetailsDto;
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
    this.getOrderStatuses();
    this.postService.getOrderById(this.productId).subscribe(
      (resp)=>{
        this.posts = resp.product;
        this.order = resp.orders;
        this.comment = this.order.comment;
        console.log(this.order)
        this.posts.photos.forEach(item => {
          this.photosArray.push(item);
        });
        this.productPrice = this.order.finalPrice;
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
    this.getUserDetails();
  }

  mobileNumber:string = '';
  address:string = '';

  oldMobileNumber:string = '';
  oldAddress:string = '';

  getUserDetails(){
    this.postService.getuserOptionalFields(this.userId).subscribe(
      (resp)=>{
        if(resp.location!=null){
          this.address = resp.location;
          this.oldAddress = this.address;
        }
        if(resp.phoneNumber!=null){
          this.mobileNumber = resp.phoneNumber;
          this.oldMobileNumber = this.mobileNumber;
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
      window.scrollTo({
        top: 0,
        behavior: 'smooth' 
      });
      return false;
    }
    if(this.address==''){
      this.addressInvalid = true;
      this.editFieldNum =2;
      setTimeout(() => {
        this.addressInvalid = false;
      }, 3000);
      window.scrollTo({
        top: 0,
        behavior: 'smooth' 
      });
      return false;
    }
    this.addressInvalid = false;
    this.mobileInvalid = false;
    return true;

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
  comment:string = '';


  orderStatuses:orderStatuses[]= [];
    getOrderStatuses(){
      this.postService.getOrderStatuses().subscribe(
        (resp)=>{
          this.orderStatuses = resp;
        }
      )
    }
  getStatusName(statusid:number){
    const name  = this.orderStatuses.find((x)=> x.id == statusid);
    return name?.statusName;
  }
}

 interface Photo {
  Id?: number;
  photoId?: number;
  photoUrl?: string;
  postId?: number;
}

export interface OrderDetailsDto {
  orderId: number;
  userId: number;
  productId: number;
  isPaid: boolean;
  statusId: number;
  createDate: string; 
  deliveryType?: string;
  productQuantity: number;
  comment: string;
  finalPrice: number;
}
