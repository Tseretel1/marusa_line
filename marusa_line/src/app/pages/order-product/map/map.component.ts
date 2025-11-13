import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { ReloadService } from '../../../shared/services/ReloadService';
import Swal from 'sweetalert2';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-picker',
  standalone: true,
  imports: [GoogleMapsModule, CommonModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapPickerComponent implements OnInit {

  @Input() config!: MapConfig;

  Map: Lnglat = {
    lat: '41.7151',
    lng: '44.8271'
  };

  map!: L.Map;
  marker!: L.Marker;
  location!: Lnglat;

  constructor(private reloadService: ReloadService) {}

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    // clean existing map if reloading
    if (this.map) {
      this.map.remove();
    }

    // marker icon configuration
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: 'assets/icons/location.png',
      shadowUrl: '',
      iconSize: [35, 35],
    });

    // initialize map
    this.map = L.map('map').setView(
      [Number(this.Map.lat), Number(this.Map.lng)],
      this.config?.zoom || 17
    );

    // add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    // place initial marker
    this.marker = L.marker([Number(this.Map.lat), Number(this.Map.lng)]).addTo(this.map);

    // listen for map clicks
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;

      // if marker exists, move it; otherwise, create new one
      if (this.marker) {
        this.marker.setLatLng(e.latlng);
      } else {
        this.marker = L.marker(e.latlng).addTo(this.map);
      }

      // store location
      this.location = {
        lat: lat.toString(),
        lng: lng.toString()
      };
    });
  }

  confirmLocation() {
    if (!this.location) {
      this.fireError('გთხოვთ აირჩიოთ ადგილი რუკაზე');
      return;
    }

    localStorage.setItem('lng', this.location.lng);
    localStorage.setItem('lat', this.location.lat);

    this.reloadService.reload();
    this.fireSuccess('');
    return this.location;
  }

  private fireSuccess(message: string) {
    Swal.fire({
      icon: 'success',
      text: message,
      showCancelButton: false,
      showConfirmButton: false,
      background: 'rgb(25, 26, 25)',
      color: '#ffffff',
      customClass: {
        popup: 'custom-swal-popup',
      },
      timer: 2500,
    });
  }

  private fireError(message: string) {
    Swal.fire({
      icon: 'error',
      text: message,
      background: 'rgb(25, 26, 25)',
      color: '#ffffff',
      confirmButtonText: 'OK',
    });
  }
}

export interface Lnglat {
  lat: string;
  lng: string;
}

export interface MapConfig {
  width: number;
  height: number;
  zoom: number;
}
