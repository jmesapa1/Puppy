import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleInversionModalComponent } from './detalle-inversion.component';

describe('DetalleInversionComponent', () => {
  let component: DetalleInversionModalComponent;
  let fixture: ComponentFixture<DetalleInversionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleInversionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleInversionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
