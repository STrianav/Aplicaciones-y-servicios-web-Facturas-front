import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentidoComponent } from './sentido.component';

describe('SentidoComponent', () => {
  let component: SentidoComponent;
  let fixture: ComponentFixture<SentidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SentidoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SentidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
