import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountMarkComponent } from './discount-mark.component';

describe('DiscountMarkComponent', () => {
  let component: DiscountMarkComponent;
  let fixture: ComponentFixture<DiscountMarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscountMarkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscountMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
