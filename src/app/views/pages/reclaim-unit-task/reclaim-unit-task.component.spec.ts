import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclaimUnitTaskComponent } from './reclaim-unit-task.component';

describe('ReclaimUnitTaskComponent', () => {
  let component: ReclaimUnitTaskComponent;
  let fixture: ComponentFixture<ReclaimUnitTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReclaimUnitTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReclaimUnitTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
