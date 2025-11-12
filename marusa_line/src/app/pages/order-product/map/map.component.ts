import { CommonModule } from '@angular/common';
import { Component, Input, input, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { LatLng } from 'leaflet';
import { ReloadService } from '../../../shared/services/ReloadService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-map-picker',
  standalone: true,
  imports: [GoogleMapsModule,CommonModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapPickerComponent implements OnInit{

  @Input() config! :MapConfig;
  constructor(private reloadService:ReloadService){

  }
  ngOnInit(): void {
    this.setMarker();
  }

  setMarker() {
    const lngStr = localStorage.getItem('lng');
    const latStr = localStorage.getItem('lat');
    if (lngStr && latStr) {
      const lng = parseFloat(lngStr);
      const lat = parseFloat(latStr);
      if (!isNaN(lat) && !isNaN(lng)) {
        this.marker = { lat, lng };
        this.center = { lat, lng };
      }
    }
    else{
        this.center = { lat: 41.7151, lng: 44.8271 };
        this.marker = { lat: 41.7151, lng: 44.8271 };
    }
  }

  
  center = { lat: 41.7151, lng: 44.8271 };
  zoom = 13;
  marker: google.maps.LatLngLiteral | null = null;
  selectedAddress: string | null = null;

  locationChosen:boolean = false;
  selectLocation(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.marker = event.latLng.toJSON();
      this.getAddress(this.marker.lat, this.marker.lng);
      this.location ={
        lat: this.marker.lat.toString(),
        lng: this.marker.lng.toString(),
      };
      this.locationChosen = true;
    }
  }

  async getAddress(lat: number, lng: number) {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCOqsY8UCE2ObuvRQBj13gGDDm_XINhTuU`
    );
    const data = await res.json();
    this.selectedAddress = data.results[0]?.formatted_address || 'Unknown address';
    console.log('Selected:', data);
  }

  location! : Lnglat;
  confirmLocation() {
    localStorage.setItem('lng', this.location.lng.toString())
    localStorage.setItem('lat', this.location.lat.toString())
    this.locationChosen = false;
    this.reloadService.reload();
    this.fireSuccess('');
    return this.location;
  }
    fireSuccess(message:string){
      Swal.fire({
          icon:'success',
          text: message,
          showCancelButton: false,
          showConfirmButton:false,
          background:'rgb(25, 26, 25)',
          color: '#ffffff',       
          customClass: {
            popup: 'custom-swal-popup',
          },
          timer:3000,
          }).then((result) => {
            if (result.isConfirmed) {
            }
      });
    }

}

export interface Lnglat{
  lat:string;
  lng:string;
}

export interface MapConfig{
  width:number;
  height:number;
  zoom:number;
}
