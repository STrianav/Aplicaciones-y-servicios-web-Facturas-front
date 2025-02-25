import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubseccionComponent } from './subseccion.component';

describe('SubseccionComponent', () => {
  let component: SubseccionComponent;
  let fixture: ComponentFixture<SubseccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubseccionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubseccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
