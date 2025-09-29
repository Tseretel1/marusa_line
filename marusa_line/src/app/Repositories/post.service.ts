import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'https://localhost:7173/';
  constructor(public http : HttpClient)
   
  {
    
  }

  getPosts(productId:number, userId?:number): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl+`Product/get-posts?productId=${productId}&userid=${userId}`);
  }
  getUserLikedPosts(userId?:number): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl+`Product/get-user-liked-posts?userid=${userId}`);
  }
  getPostWithId(id:number,userid?:number): Observable<any> {
    return this.http.get<any>(this.apiUrl+`Product/get-post-with-id?id=${id}&userid=${userid}`);
  }
  getDiscountedPosts(userId?:number): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl+`Product/get-most-discounted-posts?userid=${userId}`);
  }
  getAllPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.apiUrl+'Product/get-all-photos');
  }
  getProductTypes(): Observable<ProductTypes[]> {
    return this.http.get<ProductTypes[]>(this.apiUrl+'Product/get-product-types');
  }
  likeProduct(userid:number,productId:number): Observable<any> {
    return this.http.get<any>(this.apiUrl+`Product/like-post?userid=${userid}&productid=${productId}`);
  }
}
export interface Photo {
  id?: number;  
  photoId?: number;  
  photoUrl?: string;
  postId?: number;
}

export interface Post {
  id: number;
  title: string;
  description: string;
  price: number;
  discountedPrice: number;
  photoUrl?: string | null; 
  photoId?: number | null;  
  postId?: number;        
  likeCount: number;  
  isLiked:boolean;      
  photos: Photo[];
}
export interface ProductTypes{
 id:number;
 productType:string;
}