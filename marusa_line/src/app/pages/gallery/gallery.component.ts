import { CommonModule, NgForOf, PathLocationStrategy } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, } from '@angular/core';
import AOS from 'aos';
import { Photo, Post, PostService, ProductTypes } from '../../Repositories/post.service';
import { PhotoAlbumComponent, PhotoConfig } from '../../shared/components/photo-album/photo-album.component';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule, PhotoAlbumComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements OnInit {
  Cards: Post[] = [];
  PhotoConfig:PhotoConfig={
    priceVisible :true,
  }

  constructor(private postService:PostService){
    this.getProductTypes();
  }
  ngOnInit(): void {
    AOS.init({
          easing: 'ease-in-out',
          once: false, 
    });
      this.getAllPosts(0).subscribe((resp) => {
        this.Cards = resp;
        this.hideFilterModal();
      });
  }
 
  productTypesList :ProductTypes[]= [];
  getProductTypes(){
    this.postService.getProductTypes().subscribe(
      (resp)=>{
        this.productTypesList = resp;
      }
    )
  }
  @ViewChild('scrollToStart') scrollToStart!: ElementRef;

  scrollToStartMethod() {
    this.scrollToStart.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  activeFilterNum: number = 0;

  getAllPosts(productId: number) {
    return this.postService.getPosts(productId);
  }

  getPostByFilter(num: number) {
    this.activeFilterNum = num;
    this.getAllPosts(num).subscribe((resp) => {
      this.Cards = resp;
      this.hideFilterModal();
      this.scrollToStartMethod();
    });
  }


  filterModalVisible:boolean = false;
  showFilterModal(){
    this.filterModalVisible = true;
  }

  hideModalExecute:boolean = false;
  hideFilterModal(){
    this.hideModalExecute= true;
    setTimeout(() => {
      this.filterModalVisible = false;
      this.hideModalExecute = false;
    }, 500);
  }

  sortNum:number = 0;
  sortByPriceHighToLow(): void {
    this.Cards = [...this.Cards].sort((a, b) => b.price - a.price);
    this.sortNum = 1;
    this.hideFilterModal();
  }
  sortByPriceLowToHigh(): void {
    this.Cards = [...this.Cards].sort((a, b) => a.price - b.price);
    this.sortNum = 2;
    this.hideFilterModal();
  }
}