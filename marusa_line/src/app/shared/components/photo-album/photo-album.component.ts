import { Component, Input } from '@angular/core';
import { GalleryPhotos } from '../../../pages/gallery/gallery.component';
import { Cards } from '../cards/cards.component';

@Component({
  selector: 'app-photo-album',
  imports: [],
  templateUrl: './photo-album.component.html',
  styleUrl: './photo-album.component.scss'
})
export class PhotoAlbumComponent {
  @Input() photos!:Cards;
}
