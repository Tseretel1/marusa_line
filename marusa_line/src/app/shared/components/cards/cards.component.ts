import { Component, Input, OnInit } from '@angular/core';
import AOS from 'aos';
import { Post } from '../../../Repositories/post.service';

@Component({
  selector: 'app-cards',
  imports: [],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent implements OnInit{
  ngOnInit(): void {

  }
  @Input() posts!:Post;
}
