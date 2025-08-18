import { Component, OnInit } from '@angular/core';
import { CardsComponent } from '../../shared/components/cards/cards.component';
import { CommonModule } from '@angular/common';
import AOS from 'aos';
import { Post, PostService } from '../../Repositories/post.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardsComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private postService:PostService){

  }
  posts: Post[] = [];
  
  ngOnInit(): void {
    window.scrollTo({
     top: 0,
     behavior: 'smooth' 
   });
    AOS.init({
      easing: 'ease-in-out',
      once: false, 
    });
    this.getPosts();
  }

  getPosts(){
    this.postService.getPosts().subscribe(
      (resp)=>{
        console.log(resp)
        this.posts = resp;
      }
    )
  }
}
