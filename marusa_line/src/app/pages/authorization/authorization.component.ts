import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from './authorization.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-authorization',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.scss'
})
export class AuthorizationComponent implements OnInit{
  loginForm!:FormGroup
  constructor(private authService:AuthorizationService,private fb: FormBuilder){
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{9,15}$/)]]
    });
  }
  ngOnInit(): void {

  }
  hideModalExecute:boolean = false;
  closeModal(){
    this.hideModalExecute = true; 
    setTimeout(() => {
      this.authService.hide();
      this.hideModalExecute = false;
    }, 500);
  }

  stageNumber:number = 0;
  modalName:string = 'ავტორიზაცია'
  openStage(num:number){
    this.stageNumber = num;
    if(this.stageNumber==0){
      this.modalName = 'ავტორიზაცია'
    }
    else if(this.stageNumber ==1){
      this.modalName = 'რეგისტრაცია'
    }
  }
  loginWithGoogle() {
  const popup = window.open(
    'https://localhost:7173/User/google',  
    'googleLogin',
  );

  window.addEventListener('message', (event) => {
    if (event.origin !== 'https://api.yourapp.com') return; 
    const { token, user } = event.data;
    console.log('Got user:', user);
    console.log('Got JWT:', token);
  });
}

}
