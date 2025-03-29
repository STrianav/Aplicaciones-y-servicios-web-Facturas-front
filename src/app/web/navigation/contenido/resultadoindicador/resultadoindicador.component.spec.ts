import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoindicadorComponent } from './resultadoindicador.component';

describe('ResultadoindicadorComponent', () => {
  let component: ResultadoindicadorComponent;
  let fixture: ComponentFixture<ResultadoindicadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultadoindicadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultadoindicadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
