import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulariodinamicoComponent } from './formulariodinamico.component';

describe('FormulariodinamicoComponent', () => {
  let component: FormulariodinamicoComponent;
  let fixture: ComponentFixture<FormulariodinamicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulariodinamicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulariodinamicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
