import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudiesProgramComponent } from './studies-program.component';

describe('StudiesProgramComponent', () => {
  let component: StudiesProgramComponent;
  let fixture: ComponentFixture<StudiesProgramComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudiesProgramComponent]
    });
    fixture = TestBed.createComponent(StudiesProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
