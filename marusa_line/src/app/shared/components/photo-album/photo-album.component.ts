import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutes } from '../cards/AppRoutes/AppRoutes';
import { RouterLink } from '@angular/router';
import { Post } from '../../../Repositories/post.service';
@Component({
  selector: 'app-photo-album',
  imports: [CommonModule, RouterLink],
  templateUrl: './photo-album.component.html',
  styleUrl: './photo-album.component.scss'
})
export class PhotoAlbumComponent {
  AppRoutes= AppRoutes;
  @Input() photos!:Post;
}
