import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PedidoService } from '../services/pedido.service';
import { Pedido } from '../models/pedido.model';
import { Desk } from '../models/desk.model';

@Component({
  selector: 'app-pedido-form',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.css']
})
export class ManageOrderComponent implements OnInit {

  pedidoForm!: FormGroup;
  pedido: Pedido = { date: '', employee_id: 0, desk_id: 0, total: 0, observation: '' };
  constructor(private formBuilder: FormBuilder, private pedidoService: PedidoService, private authService: AuthService) {}


  ngOnInit() {
    this.pedidoForm = this.formBuilder.group({
      date: ['', Validators.required],
      employee_id: [this.authService.getUserId(), Validators.required],
      desk_id: ['', Validators.required],
      total: ['', Validators.required],
      observation: ['', Validators.maxLength(100)]
    });

    // Chame o serviço para obter as mesas
    this.pedidoService.getMesas().subscribe((mesas: Desk[]) => {
      // Armazene as mesas em uma variável para uso posterior
      this.mesas = mesas;
    });
  }


  onSubmit() {
    if (this.pedidoForm.valid) {
      const pedidoData: Pedido = this.pedidoForm.value;

      this.pedidoService.addPedido(pedidoData).subscribe((response: Pedido) => {
        console.log('Pedido de mesa adicionado com sucesso:', response);
      });
    }
  }
}
