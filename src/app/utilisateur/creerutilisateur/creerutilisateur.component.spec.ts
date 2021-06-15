import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerutilisateurComponent } from './creerutilisateur.component';

describe('CreerutilisateurComponent', () => {
  let component: CreerutilisateurComponent;
  let fixture: ComponentFixture<CreerutilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreerutilisateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreerutilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
