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

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl+'post/get-posts');
  }
  getAllPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.apiUrl+'post/get-all-photos');
  }
  

}
export interface Photo {
  Id?: number;
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
  photos: Photo[];
}