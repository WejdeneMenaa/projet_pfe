import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsticketComponent } from './detailsticket.component';

describe('DetailsticketComponent', () => {
  let component: DetailsticketComponent;
  let fixture: ComponentFixture<DetailsticketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsticketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
