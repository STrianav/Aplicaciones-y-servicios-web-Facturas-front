import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadmedicionComponent } from './unidadmedicion.component';

describe('UnidadmedicionComponent', () => {
  let component: UnidadmedicionComponent;
  let fixture: ComponentFixture<UnidadmedicionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnidadmedicionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnidadmedicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
