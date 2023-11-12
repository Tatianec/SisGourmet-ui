import { Component, OnInit } from '@angular/core';
import { Pedido } from '../../models/pedido.model';
import { PedidoService } from '../../services/pedido.service';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.css']
})
export class ListaPedidosComponent implements OnInit {
  pedidos: Pedido[] = [];
  employees: Employee[] = [];

  constructor(
    private pedidoService: PedidoService,
    private employeeService: EmployeeService,
    ) { }

  ngOnInit(): void {
    this.loadPedidos();
    this.loadEmployees();
  }

  loadProdutos() {
    this.pedidoService.getPedidos().subscribe(
      data => this.pedidos = data,
      error => console.error('Erro ao carregar pedidos:', error)
    );
  }
  getEmployeeName(employeeId: number): string {
    const employee = this.employees.find(emp => emp.id === employeeId);
    return employee ? employee.name : 'N/A';
  }


  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (data) => (this.employees = data),
      (error) => console.error('Erro ao carregar funcionários:', error)
    );
  }

  loadPedidos() {
    this.pedidoService.getPedidos().subscribe(
      data => this.pedidos = data,
      error => console.error('Erro ao carregar pedidos:', error)

      );
      console.log( this.pedidos);
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
