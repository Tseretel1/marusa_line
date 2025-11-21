import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Post, PostService } from '../../Repositories/post.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import * as  AOS from 'aos';
import { AuthorizationService } from '../authorization/authorization.service';
import Swal from 'sweetalert2';
import { FormsModule, ɵInternalFormsSharedModule } from "@angular/forms";
import { AppRoutes } from '../../shared/AppRoutes/AppRoutes';
import { HttpClient } from '@angular/common/http';
import { Lnglat, MapConfig, MapPickerComponent } from "./map/map.component";
import { ReloadService } from '../../shared/services/ReloadService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-product',
  imports: [CommonModule, ɵInternalFormsSharedModule, FormsModule, MapPickerComponent],
  templateUrl: './order-product.component.html',
  styleUrl: './order-product.component.scss'
})
export class OrderProductComponent implements OnInit{

  


  productId:number = 0;
  posts:Post = {} as Post;
  photosArray:Photo[]= [];
  postsLoaded:boolean = false;

  user:any = null;
  userId:number = 0;
  constructor(private postService:PostService, 
    private route :ActivatedRoute,
    private authServise:AuthorizationService,
    private router:Router,private http:HttpClient,
    private reloadService:ReloadService
  ){
    const id = this.route.snapshot.paramMap.get('id');
    this.productId = Number(id);
    const user = localStorage.getItem('user');
    if(user){
      this.user =JSON.parse(user);
      this.userId = this.user.Id
    }
    this.postService.getPostWithId(this.productId,this.userId).subscribe(
      (resp)=>{
        this.posts = resp;
        this.posts.photos.forEach(item => {
          this.photosArray.push(item);
        });
        if(this.posts.discountedPrice==0|| this.posts.discountedPrice==null){
          this.postsLoaded = true;
          this.productPrice = resp.price;
          this.oldProductPrice = this.productPrice;
          this.oneProductPrice = this.productPrice;
        }
        else{
          this.postsLoaded = true;
          this.productPrice = resp.discountedPrice;
          this.oldProductPrice = this.productPrice;
          this.oneProductPrice = this.productPrice;
        }
      }
    );
  }
  reloadSubscription!: Subscription;

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
      this.reloadSubscription = this.reloadService.alert$.subscribe(
      (show)=>{
      if(show){
        this.getMapLocation();
      }
    })
    this.getMapLocation();
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

  mapModalVisible:boolean = false;
  openMapModal(){
    this.mapModalVisible = true;
  }
  hideMapModal(){
    this.mapModalVisible = false;
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
    if(this.location.lat=='' && this.location.lng==''){
      Swal.fire({
          text: 'გთხოვთ მონიშნოთ მისამართი რუკაზე🙏',
          icon:'error',
          showCancelButton: false,
          showConfirmButton:false,
          confirmButtonText: 'კი',
          cancelButtonText: 'არა',
          background:'rgb(25, 26, 25)',
          color: '#ffffff',       
          customClass: {
            popup: 'custom-swal-popup',
          },
          timer:3000,
      });
       window.scrollTo({
        top: 0,
        behavior: 'smooth' 
      });
      this.openMapModal();
      return false;
    }
    this.addressInvalid = false;
    this.mobileInvalid = false;
    return true;

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
    if(this.posts.quantity>0){
      if(this.productQuantity<this.posts.quantity){
        this.productQuantity++;
        this.calculatePrice();
      }
    }
  }
  minusQuantity(){
    if(this.productQuantity>=2){
      this.productQuantity--;
      this.calculatePrice();
    }
  }

  delieveryChoise:number = 1;
  deliveryString:string = "კურიერის მომსახურება🚚";
  
  delieveryChoiseChanged:boolean = false;
  oldProductPrice: number = 0;
  comment:string = '';


  orderObj!:orderPostObj;
  insertOrder(){
    this.getMapLocation();
    if(this.validateFields()){
      this.orderObj= {
        userId:this.userId,
        productId : this.productId,
        productQuantity : this.productQuantity,
        deliveryType : this.deliveryString, 
        comment :this.comment,
        finalPrice : this.productPrice,
        lng:this.location.lng,
        lat:this.location.lat,
        address:this.address,
      }
      console.log(this.orderObj)
      this.postService.insertOrder(this.orderObj).subscribe(
        (resp)=>{
          if(resp!=null){
            Swal.fire({
                text: 'შეკვეთა მიღებულია!',
                icon:'success',
                showCancelButton: false,
                showConfirmButton:false,
                confirmButtonText: 'კი',
                cancelButtonText: 'არა',
                background:'rgb(25, 26, 25)',
                color: '#ffffff',       
                customClass: {
                  popup: 'custom-swal-popup',
                },
                timer:3000,
            }),
            this.router.navigate([AppRoutes.order_details + resp])
          }
      })
    }
  }
  location : Lnglat = {
    lng:'',
    lat:''
  };
  locationselected:boolean = false;
  getMapLocation(){
    const lng = localStorage.getItem('lng');
    const lat = localStorage.getItem('lat');
    if(lng && lat){
      this.location.lng = lng.toString();
      this.location.lat = lat.toString();
      this.locationselected = true;
      this.mapModalVisible = false;
    }
  }

  mapConfig:MapConfig={
    width:100,
    height:400,
    zoom:13,
  }


}

export interface orderPostObj{
  userId:number;
  productId:number;
  productQuantity:number;
  deliveryType:string;
  comment :string;
  finalPrice:number;
  lng: string|null;
  lat: string|null;
  address: string|null;
}
 interface Photo {
  Id?: number;
  photoId?: number;
  photoUrl?: string;
  postId?: number;
}