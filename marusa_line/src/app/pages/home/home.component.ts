import { Component, OnInit } from '@angular/core';
import { Cards, CardsComponent } from '../../shared/components/cards/cards.component';
import { CommonModule } from '@angular/common';
import AOS from 'aos';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardsComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cards: Cards[] = [];

  ngOnInit(): void {
    window.scrollTo({
     top: 0,
     behavior: 'smooth' 
   });
    this.cards = this.generateCards(15);
    AOS.init({
      easing: 'ease-in-out',
      once: false, 
    });
  }

  private generateCards(count: number): Cards[] {
    const randomCards: Cards[] = [];

    const epoxyProducts = [
      'დომინო',
    ];

    const sampleDescriptions = [
      'დომინო ახალ ფერებში🤍💙 მზადდება სასურველ ფერში✨ შესაკვეთად მომწერე💌 #დომინო #Domino #BoardGames #TableGames #თამაშები #სათამაშოები #GameNight #თამაშისდღეა🚀'
    ];

    for (let i = 0; i < count; i++) {
      const product = epoxyProducts[Math.floor(Math.random() * epoxyProducts.length)];
      const description = sampleDescriptions[Math.floor(Math.random() * sampleDescriptions.length)];

      randomCards.push({
        name: `${product}`,
        price: Math.floor(Math.random() * 300) + 20, 
        description,
        viewCount: Math.floor(Math.random() * 1000),
        photoUrl: "assets/img/epo.png" 
      });
    }

    return randomCards;
  }
}
