import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
 loading$!: Observable<boolean>;
  constructor(private loaderService: LoaderService) {}
  ngOnInit(): void {
    console.log('fvef')
    this.loading$ = this.loaderService.loading$;
  }
}
