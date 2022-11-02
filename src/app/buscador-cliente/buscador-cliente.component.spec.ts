import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorClienteComponent } from './buscador-cliente.component';

describe('BuscadorClienteComponent', () => {
  let component: BuscadorClienteComponent;
  let fixture: ComponentFixture<BuscadorClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscadorClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
