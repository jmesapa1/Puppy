import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleInversionComponent } from './detalle-inversion.component';

describe('DetalleInversionComponent', () => {
  let component: DetalleInversionComponent;
  let fixture: ComponentFixture<DetalleInversionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleInversionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleInversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
