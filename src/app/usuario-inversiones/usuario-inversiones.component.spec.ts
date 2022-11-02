import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioInversionesComponent } from './usuario-inversiones.component';

describe('DetalleUsuarioComponent', () => {
  let component: UsuarioInversionesComponent;
  let fixture: ComponentFixture<UsuarioInversionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioInversionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioInversionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
