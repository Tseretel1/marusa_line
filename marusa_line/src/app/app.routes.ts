import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { CardDetailsComponent } from './pages/card-details/card-details.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
    { path:'home', component: HomeComponent},
    { path:'home/', component: HomeComponent},
    { path:'card-details/:id', component: CardDetailsComponent},
    { path:'profile', component: ProfileComponent},
    { path:'', component: HomeComponent},
    { path: '', component: HomeComponent }, 
    { path: '**', component: HomeComponent }  
];
