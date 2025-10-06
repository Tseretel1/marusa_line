import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from './authorization.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppUrl } from '../../shared/Url/Appurl';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoutes } from '../../shared/AppRoutes/AppRoutes';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-authorization',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.scss'
})
export class AuthorizationComponent implements OnInit{
  AppUrl = AppUrl ;
  loginForm!:FormGroup
  user:any = null;
  constructor(private authService:AuthorizationService,private fb: FormBuilder,private Router:Router){
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
    window.open(
      `${AppUrl.development}User/google`,
      'googleLogin',
    );
    window.addEventListener('message', this.handleGoogleMessage.bind(this));
  }
  handleGoogleMessage(event: MessageEvent) {
    if (event.origin !==`${AppUrl.devRedirection}`) return;
    const { token, user } = event.data;
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    this.authService.userAuthorized();

    const getUser  = localStorage.getItem('user');
    if(getUser){
      this.user =JSON.parse(getUser);
      this.fireSwall(this.user.Name);
      this.closeModal();
       setTimeout(() => {
      }, 3000);
    }
  }

  loginWithFacebook() {
  window.open(
    `${AppUrl.development}User/facebook`,
    'facebookLogin',
  );
    window.addEventListener('message', this.handleFacebookMessage.bind(this));
  }

  handleFacebookMessage(event: MessageEvent) {
    if (event.origin !== `${AppUrl.devRedirection}`) return;
    const { token, user } = event.data;
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    this.authService.userAuthorized();

    const getUser  = localStorage.getItem('user');
    if(getUser){
      this.user =JSON.parse(getUser);
      this.fireSwall(this.user.Name);
      this.closeModal();
       setTimeout(() => {
      }, 3000);
    }
  }
  fireSwall(message:string){
    Swal.fire({
        icon:'success',
        text: message,
        showCancelButton: false,
        showConfirmButton:false,
        confirmButtonText: 'კი',
        cancelButtonText: 'არა',
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
