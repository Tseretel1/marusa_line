import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization/authorization.service';
import { RouterLink } from '@angular/router';
import { AppRoutes } from '../../shared/AppRoutes/AppRoutes';
import { Post, PostService } from '../../Repositories/post.service';
import { PhotoAlbumComponent, PhotoConfig } from '../../shared/components/photo-album/photo-album.component';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { transition } from '@angular/animations';

@Component({
  selector: 'app-profile',
  imports: [RouterLink,PhotoAlbumComponent,CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
  AppRoutes=AppRoutes;
  constructor(private authService:AuthorizationService,private postService:PostService){
    
  }
  PhotoConfig:PhotoConfig={
  priceVisible :true,
  }
  Cards: Post[] = [];
  ngOnInit(): void {
  window.scrollTo({
     top: 0,
     behavior: 'smooth' 
   });
    this.getAllPosts().subscribe((resp) => {
      this.Cards = resp;
    });
  }
  
  user:any = null;
  userId:number = 0;

  getAllPosts() {
    const user = localStorage.getItem('user');
    if(user){
      this.user =JSON.parse(user);
      this.userId = this.user.Id
    }
    console.log(this.user)
    return this.postService.getUserLikedPosts(this.userId);
  }
  
  likesOrOrders:number = 1;
  
  changeProductSource(num:number){
    this.likesOrOrders = num;
  }
  logout(){
    Swal.fire({
    title: 'აქაუნთიდან გასვლა',
    text: 'ნამდვილად გსურთ აქაუნთიდან გასვლა?',
    showCancelButton: true,
    confirmButtonText: 'კი',
    cancelButtonText: 'არა',
    background:'rgba(0, 0, 0, 0.64)',
    color: '#ffffff',       
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    customClass: {
      popup: 'custom-swal-popup',
    }
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Proceeded!');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.authService.userNotAuthorized();
      }
    });
  }
}
