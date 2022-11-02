import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaComprobantePagoComponent } from './carga-comprobante-pago.component';

describe('CargaComprobantePagoComponent', () => {
  let component: CargaComprobantePagoComponent;
  let fixture: ComponentFixture<CargaComprobantePagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargaComprobantePagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargaComprobantePagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
