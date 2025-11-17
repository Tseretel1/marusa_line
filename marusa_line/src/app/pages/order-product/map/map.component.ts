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
    lat: '41.6938',
    lng: '44.8015',
  };

  map!: L.Map;
  marker!: L.Marker;
  location: Lnglat = {
    lat: '',
    lng: '',
  };

  constructor(private reloadService: ReloadService) {}

  ngOnInit(): void {
    this.initMap();
  }

  initMap(): void {
    const savedLng = localStorage.getItem('lng');
    const savedLat = localStorage.getItem('lat');

    const lat = savedLat ? Number(savedLat) : 41.7151;
    const lng = savedLng ? Number(savedLng) : 44.8271;

    this.Map.lat = lat.toString();
    this.Map.lng = lng.toString();

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

    if (!isNaN(lat) && !isNaN(lng)) {
      this.marker = L.marker([lat, lng]).addTo(this.map);
      this.location = { lat: lat.toString(), lng: lng.toString() };
    }

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;

      if (this.marker) {
        this.marker.setLatLng(e.latlng);
      } else {
        this.marker = L.marker(e.latlng).addTo(this.map);
      }

      this.location = { lat: lat.toString(), lng: lng.toString() };
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
