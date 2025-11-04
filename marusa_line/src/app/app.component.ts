import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from "./layout/footer/footer.component";
import { LoaderComponent } from "./shared/components/loader/loader.component";
import { AuthorizationComponent } from "./pages/authorization/authorization.component";
import { Observable, Subscription } from 'rxjs';
import { AuthorizationService } from './pages/authorization/authorization.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, LoaderComponent, AuthorizationComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'marusa_line';

  constructor(private authService: AuthorizationService){
  }

  private AuthSub!: Subscription;
  authorizationVisible:boolean= false;  
  
  ngOnInit(): void {
    this.AuthSub = this.authService.authorization$.subscribe(
      (isVisible) => {
        this.authorizationVisible = isVisible;
      }
    );
  }

  ngOnDestroy(): void {
    this.AuthSub.unsubscribe();
  }

  private lastTouchEnd = 0;

  // @HostListener('document:touchend', ['$event'])
  // onTouchEnd(event: TouchEvent) {
  //   const now = new Date().getTime();
  //   if (now - this.lastTouchEnd <= 300) {
  //     event.preventDefault(); 
  //   }
  //   this.lastTouchEnd = now;
  // }
}
