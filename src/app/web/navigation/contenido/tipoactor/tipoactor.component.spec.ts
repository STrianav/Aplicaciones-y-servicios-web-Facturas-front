import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoactorComponent } from './tipoactor.component';

describe('TipoactorComponent', () => {
  let component: TipoactorComponent;
  let fixture: ComponentFixture<TipoactorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoactorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
