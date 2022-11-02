import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleUsuarioModalComponent } from './detalle-usuario-modal.component';

describe('DetalleInversionComponent', () => {
  let component: DetalleUsuarioModalComponent;
  let fixture: ComponentFixture<DetalleUsuarioModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleUsuarioModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleUsuarioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
