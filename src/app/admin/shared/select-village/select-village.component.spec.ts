import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectVillageComponent } from './select-village.component';

describe('SelectVillageComponent', () => {
  let component: SelectVillageComponent;
  let fixture: ComponentFixture<SelectVillageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectVillageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectVillageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
