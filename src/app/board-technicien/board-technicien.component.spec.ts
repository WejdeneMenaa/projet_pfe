import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardTechnicienComponent } from './board-technicien.component';

describe('BoardTechnicienComponent', () => {
  let component: BoardTechnicienComponent;
  let fixture: ComponentFixture<BoardTechnicienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardTechnicienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardTechnicienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
