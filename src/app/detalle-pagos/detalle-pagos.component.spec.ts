import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePagosComponent } from './detalle-pagos.component';

describe('DetalleUsuarioComponent', () => {
  let component: DetallePagosComponent;
  let fixture: ComponentFixture<DetallePagosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallePagosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallePagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
