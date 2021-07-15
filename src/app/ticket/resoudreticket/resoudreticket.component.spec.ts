import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResoudreticketComponent } from './resoudreticket.component';

describe('ResoudreticketComponent', () => {
  let component: ResoudreticketComponent;
  let fixture: ComponentFixture<ResoudreticketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResoudreticketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResoudreticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
