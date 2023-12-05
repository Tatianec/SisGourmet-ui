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
    private employeeService: EmployeeService
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
    this.productService.getProdutos().subscribe(
      (products) => {
        this.totalProdutos = products.length;
      },
      (error) => {
        console.error('Erro ao carregar total de produtos:', error);
      }
    );
  }

  loadTotalFuncionarios(): void {
    this.employeeService.getEmployees().subscribe(
      (employees) => {
        console.log('Funcionários recuperados:', employees);
        this.totalFuncionarios = employees.length;
      },
      (error) => {
        console.error('Erro ao carregar total de funcionários:', error);
      }
    );
  }
}
