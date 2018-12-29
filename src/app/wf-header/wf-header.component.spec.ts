import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WfHeaderComponent } from './wf-header.component';

describe('WfHeaderComponent', () => {
  let component: WfHeaderComponent;
  let fixture: ComponentFixture<WfHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WfHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WfHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
