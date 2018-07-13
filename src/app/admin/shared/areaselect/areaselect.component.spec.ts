import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaselectComponent } from './areaselect.component';

describe('AreaselectComponent', () => {
  let component: AreaselectComponent;
  let fixture: ComponentFixture<AreaselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaselectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
