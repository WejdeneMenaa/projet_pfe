import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerticketComponent } from './creerticket.component';

describe('CreerticketComponent', () => {
  let component: CreerticketComponent;
  let fixture: ComponentFixture<CreerticketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreerticketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreerticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
