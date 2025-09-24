import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

    constructor() { }
    private authorization = new BehaviorSubject<boolean>(false);
    authorization$ = this.authorization.asObservable();
  
    show(): void {
      this.authorization.next(true);
    }
  
    hide(): void {
      this.authorization.next(false);
    }
}
