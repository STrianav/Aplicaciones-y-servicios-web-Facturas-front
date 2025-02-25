import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepresenvisualComponent } from './represenvisual.component';

describe('RepresenvisualComponent', () => {
  let component: RepresenvisualComponent;
  let fixture: ComponentFixture<RepresenvisualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepresenvisualComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepresenvisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
