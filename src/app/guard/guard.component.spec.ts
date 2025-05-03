/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GuardComponent } from './guard.component';

describe('GuardComponent', () => {
  let component: GuardComponent;
  let fixture: ComponentFixture<GuardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
