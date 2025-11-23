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
  styleUrls: ['./map.component.scss'],
})
export class MapPickerComponent implements OnInit {
  @Input() config!: MapConfig;

  Map: Lnglat = {
    lat: '41.693376147867006',
    lng: '44.801519215106964',
  };

  map!: L.Map;
  marker!: L.Marker;
  location: Lnglat = {
    lat: '',
    lng: '',
  };

  constructor(private reloadService: ReloadService) {}

  async ngOnInit() {
      const { lat, lng } = await this.getUserCoordinates();
      this.initMap(lat, lng);
  }

getUserCoordinates(): Promise<{ lat: number, lng: number }> {
  return new Promise((resolve) => {

    const savedLat = localStorage.getItem('lat');
    const savedLng = localStorage.getItem('lng');

    if (savedLat && savedLng) {
      resolve({
        lat: Number(savedLat),
        lng: Number(savedLng)
      });
      return;
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          localStorage.setItem('lat', lat.toString());
          localStorage.setItem('lng', lng.toString());
          resolve({ lat, lng });
        },
        () => {
          resolve(this.getFallbackCoordinates());
        }
      );
    } else {
      resolve(this.getFallbackCoordinates());
    }
  });
}

getFallbackCoordinates(): { lat: number, lng: number } {
  const savedLat = localStorage.getItem('lat');
  const savedLng = localStorage.getItem('lng');

  if (savedLat && savedLng) {
    return {
      lat: Number(savedLat),
      lng: Number(savedLng)
    };
  }

  return { lat: 41.7151, lng: 44.8271 };
}





  initMap(lat: number, lng: number): void {

  if (this.map) {
    this.map.remove();
  }

  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
    iconUrl: 'assets/leaflet/marker-icon.png',
    shadowUrl: 'assets/leaflet/marker-shadow.png',
    iconSize: [20, 30],
  });


  this.map = L.map('map').setView([lat, lng], this.config?.zoom || 17);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
  }).addTo(this.map);


  this.marker = L.marker([lat, lng]).addTo(this.map);


  this.map.on('click', (e: L.LeafletMouseEvent) => {
    const { lat, lng } = e.latlng;

    this.marker?.setLatLng(e.latlng);

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
    this.fireSuccess('მისამართი წარმატებით მოინიშნა!');
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
