import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  totalPedidos: number = 0;
  totalProdutos: number = 0;
  totalFuncionarios: number = 0;

  constructor(
    private pedidoService: PedidoService,
    private productService: ProductService,
    private employeeService: EmployeeService,
    ) {}

  ngOnInit(): void {
    this.loadTotalPedidos();
    this.loadTotalProdutos();
    this.loadTotalFuncionarios();
  }

  loadTotalPedidos(): void {
    this.pedidoService.getPedidos().subscribe(
      (pedidos) => {
        this.totalPedidos = pedidos.length;
      },
      (error) => {
        console.error('Erro ao carregar total de pedidos:', error);
      }
    );
  }

  loadTotalProdutos(): void {
    this.productService.listarProdutos().subscribe(
      (products) => {
        this.totalPedidos = products.length;
      },
      (error) => {
        console.error('Erro ao carregar total de pedidos:', error);
      }
    );
  }

  loadTotalFuncionarios(): void {
    this.employeeService.getEmployees().subscribe(
      (employees) => {
        this.totalPedidos = employees.length;
      },
      (error) => {
        console.error('Erro ao carregar total de pedidos:', error);
      }
    );
  }
}
