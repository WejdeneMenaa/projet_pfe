import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherticketadminComponent } from './afficherticketadmin.component';

describe('AfficherticketadminComponent', () => {
  let component: AfficherticketadminComponent;
  let fixture: ComponentFixture<AfficherticketadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherticketadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherticketadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
