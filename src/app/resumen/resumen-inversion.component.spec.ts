import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenInversionComponent } from './resumen-inversion.component';

describe('DetalleUsuarioComponent', () => {
  let component: ResumenInversionComponent;
  let fixture: ComponentFixture<ResumenInversionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenInversionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenInversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
