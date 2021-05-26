import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherutilisateurComponent } from './afficherutilisateur.component';

describe('AfficherutilisateurComponent', () => {
  let component: AfficherutilisateurComponent;
  let fixture: ComponentFixture<AfficherutilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherutilisateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherutilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
