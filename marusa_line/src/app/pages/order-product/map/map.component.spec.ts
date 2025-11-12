import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapPickerComponent } from './map.component';

describe('MapComponent', () => {
  let component: MapPickerComponent;
  let fixture: ComponentFixture<MapPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapPickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
