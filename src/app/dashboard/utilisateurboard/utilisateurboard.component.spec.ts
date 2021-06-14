import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisateurboardComponent } from './utilisateurboard.component';

describe('UtilisateurboardComponent', () => {
  let component: UtilisateurboardComponent;
  let fixture: ComponentFixture<UtilisateurboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtilisateurboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilisateurboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
