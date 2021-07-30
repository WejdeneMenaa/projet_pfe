import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherticketclotureComponent } from './afficherticketcloture.component';

describe('AfficherticketclotureComponent', () => {
  let component: AfficherticketclotureComponent;
  let fixture: ComponentFixture<AfficherticketclotureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherticketclotureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherticketclotureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
