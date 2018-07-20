import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimepickComponent } from './timepick.component';

describe('TimepickComponent', () => {
  let component: TimepickComponent;
  let fixture: ComponentFixture<TimepickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimepickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimepickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
