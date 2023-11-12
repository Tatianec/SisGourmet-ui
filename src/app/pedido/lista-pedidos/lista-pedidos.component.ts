import { Component, OnInit } from '@angular/core';
import { Pedido } from '../../models/pedido.model';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.css']
})
export class ListaPedidosComponent implements OnInit {
  pedidos: Pedido[] = [];

  constructor(private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.loadPedidos();
  }

  loadProdutos() {
    this.pedidoService.getPedidos().subscribe(
      data => this.pedidos = data,
      error => console.error('Erro ao carregar pedidos:', error)
    );
  }

  loadPedidos() {
    this.pedidoService.getPedidos().subscribe(
      data => this.pedidos = data,
      error => console.error('Erro ao carregar pedidos:', error)
    );
  }

  onPedidoAdded() {
    this.loadPedidos();
  }

  deletePedido(pedido: Pedido) {
    if (confirm('Tem certeza que deseja excluir esta mesa?')) {
      if (pedido.id !== undefined) {
        this.pedidoService.deletePedido(pedido.id).subscribe(
          () => {
            this.loadPedidos();
          },
          (error) => {
            console.error('Erro ao excluir a mesa:', error);
          }
        );
      } else {
        console.error(
          'ID da mesa é undefined. A exclusão não pode ser realizada.'
        );
      }
    }
  }
}
