import { TestBed } from '@angular/core/testing';

import { CanEnterTabsPageGuard } from './can-enter-tabs-page.guard';

describe('CanEnterTabsPageGuard', () => {
  let guard: CanEnterTabsPageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanEnterTabsPageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
