import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclaimUnitInquiryComponent } from './reclaim-unit-inquiry.component';

describe('ReclaimUnitInquiryComponent', () => {
  let component: ReclaimUnitInquiryComponent;
  let fixture: ComponentFixture<ReclaimUnitInquiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReclaimUnitInquiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReclaimUnitInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
