import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WfFloorPlanComponent } from './wf-floor-plan.component';

describe('WfFloorPlanComponent', () => {
  let component: WfFloorPlanComponent;
  let fixture: ComponentFixture<WfFloorPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WfFloorPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WfFloorPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
