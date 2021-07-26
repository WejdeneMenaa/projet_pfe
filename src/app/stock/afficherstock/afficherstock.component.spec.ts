import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherstockComponent } from './afficherstock.component';

describe('AfficherstockComponent', () => {
  let component: AfficherstockComponent;
  let fixture: ComponentFixture<AfficherstockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherstockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
