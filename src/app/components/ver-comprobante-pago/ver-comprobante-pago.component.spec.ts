import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerComprobantePagoComponent } from './ver-comprobante-pago.component';

describe('VerComprobantePagoComponent', () => {
  let component: VerComprobantePagoComponent;
  let fixture: ComponentFixture<VerComprobantePagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerComprobantePagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerComprobantePagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
