import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariablesporindicadorComponent } from './variablesporindicador.component';

describe('VariablesporindicadorComponent', () => {
  let component: VariablesporindicadorComponent;
  let fixture: ComponentFixture<VariablesporindicadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VariablesporindicadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VariablesporindicadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
