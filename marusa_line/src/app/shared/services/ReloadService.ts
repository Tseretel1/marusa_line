import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReloadService {
  private alertSubject = new BehaviorSubject<boolean>(false);
  alert$ = this.alertSubject.asObservable();

  reload() {
    this.alertSubject.next(true);
  }
  hide() {
    this.alertSubject.next(false);
  }
}
