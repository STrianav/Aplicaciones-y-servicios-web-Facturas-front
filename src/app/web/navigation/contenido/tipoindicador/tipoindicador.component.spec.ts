import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoindicadorComponent } from './tipoindicador.component';

describe('TipoindicadorComponent', () => {
  let component: TipoindicadorComponent;
  let fixture: ComponentFixture<TipoindicadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoindicadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoindicadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
