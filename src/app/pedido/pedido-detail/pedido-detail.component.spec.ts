import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoDetailComponent } from './pedido-detail.component';

describe('PedidoDetailComponent', () => {
  let component: PedidoDetailComponent;
  let fixture: ComponentFixture<PedidoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PedidoDetailComponent]
    });
    fixture = TestBed.createComponent(PedidoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
