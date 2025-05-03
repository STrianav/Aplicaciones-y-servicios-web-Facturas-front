/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Api.serviceAuthService } from './api.service-auth.service';

describe('Service: Api.serviceAuth', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Api.serviceAuthService]
    });
  });

  it('should ...', inject([Api.serviceAuthService], (service: Api.serviceAuthService) => {
    expect(service).toBeTruthy();
  }));
});
