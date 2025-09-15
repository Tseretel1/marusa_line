import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
 private apiUrl = 'https://192.168.1.14:7174/';
  constructor(public http : HttpClient)
   
  {
    
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl+'post/get-posts');
  }
  getPostWithId(id:number): Observable<any> {
    return this.http.get<any>(this.apiUrl+`post/get-post-with-id?id=${id}`);
  }
  getDiscountedPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl+'post/get-most-discounted-posts');
  }
  getAllPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.apiUrl+'post/get-all-photos');
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
  photos: Photo[];
}
