import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierstockComponent } from './modifierstock.component';

describe('ModifierstockComponent', () => {
  let component: ModifierstockComponent;
  let fixture: ComponentFixture<ModifierstockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierstockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
