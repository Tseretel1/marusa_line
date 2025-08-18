import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GalleryComponent } from './pages/gallery/gallery.component';

export const routes: Routes = [
    { path:'home', component: HomeComponent},
    { path:'gallery', component: GalleryComponent},
    { path:'', component: HomeComponent},
    { path: '', component: HomeComponent }, 
    { path: '**', component: HomeComponent }  
];
