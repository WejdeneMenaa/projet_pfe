import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherticketaffecteComponent } from './afficherticketaffecte.component';

describe('AfficherticketaffecteComponent', () => {
  let component: AfficherticketaffecteComponent;
  let fixture: ComponentFixture<AfficherticketaffecteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherticketaffecteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherticketaffecteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
