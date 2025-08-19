import { Component, Input } from '@angular/core';
import { GalleryPhotos } from '../../../pages/gallery/gallery.component';
import { Cards } from '../cards/cards.component';
import { CommonModule } from '@angular/common';
import { AppRoutes } from '../cards/AppRoutes/AppRoutes';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-photo-album',
  imports: [CommonModule, RouterLink],
  templateUrl: './photo-album.component.html',
  styleUrl: './photo-album.component.scss'
})
export class PhotoAlbumComponent {
  AppRoutes= AppRoutes;
  @Input() photos!:Cards;
}
