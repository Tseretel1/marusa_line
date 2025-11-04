import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
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
 @ViewChild('scrollToBottom') scrollToStart!: ElementRef;

  scrollToBottomMethod() {
    this.scrollToStart.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => {
  }, 500);
  }


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

  isUserLogged(){
    const user = localStorage.getItem('user');
    if(user){
      return true;
    }
    this.authServise.show();
    return false;
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
