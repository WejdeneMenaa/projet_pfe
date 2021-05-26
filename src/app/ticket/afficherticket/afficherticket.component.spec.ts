import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherticketComponent } from './afficherticket.component';

describe('AfficherticketComponent', () => {
  let component: AfficherticketComponent;
  let fixture: ComponentFixture<AfficherticketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherticketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
