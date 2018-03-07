import { TestBed, inject } from '@angular/core/testing';

import { BrowserTitleService } from './browser-title.service';

describe('BrowserTitleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrowserTitleService]
    });
  });

  it('should be created', inject([BrowserTitleService], (service: BrowserTitleService) => {
    expect(service).toBeTruthy();
  }));
});
