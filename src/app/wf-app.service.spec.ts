import { TestBed, inject } from '@angular/core/testing';

import { WfAppService } from './wf-app.service';

describe('WfAppService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WfAppService]
    });
  });

  it('should be created', inject([WfAppService], (service: WfAppService) => {
    expect(service).toBeTruthy();
  }));
});
