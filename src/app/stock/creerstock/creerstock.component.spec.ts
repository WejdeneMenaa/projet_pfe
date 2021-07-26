import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerstockComponent } from './creerstock.component';

describe('CreerstockComponent', () => {
  let component: CreerstockComponent;
  let fixture: ComponentFixture<CreerstockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreerstockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreerstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
