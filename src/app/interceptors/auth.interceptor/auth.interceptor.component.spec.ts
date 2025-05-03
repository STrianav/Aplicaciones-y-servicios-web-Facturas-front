/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Auth.interceptorComponent } from './auth.interceptor.component';

describe('Auth.interceptorComponent', () => {
  let component: Auth.interceptorComponent;
  let fixture: ComponentFixture<Auth.interceptorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Auth.interceptorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Auth.interceptorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
