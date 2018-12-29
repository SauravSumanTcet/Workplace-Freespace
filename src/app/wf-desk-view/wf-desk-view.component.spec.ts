import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WfDeskViewComponent } from './wf-desk-view.component';

describe('WfDeskViewComponent', () => {
  let component: WfDeskViewComponent;
  let fixture: ComponentFixture<WfDeskViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WfDeskViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WfDeskViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
