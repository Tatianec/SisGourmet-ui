import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit } from '@angular/core';
import { Pedido } from '../../models/pedido.model';
import { PedidoService } from '../../services/pedido.service';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { DialogService } from 'primeng/dynamicdialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.css'],
  providers: [DialogService],
})
export class ListaPedidosComponent implements OnInit {
  pedidos: Pedido[] = [];
  employees: Employee[] = [];
  display: boolean = false;
  selectedPedido!: Pedido;

  constructor(
    private pedidoService: PedidoService,
    private employeeService: EmployeeService,
    private dialogService: DialogService,
    private cdr: ChangeDetectorRef,
    private datePipe: DatePipe,
  ) {}

  ngOnInit(): void {
    this.loadPedidos();
    this.loadEmployees();

  }

  getEmployeeName(employeeId: number): string {
    const employee = this.employees.find((emp) => emp.id === employeeId);
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
      (data) => {
        console.log(data);

        this.pedidos = data;
        console.log('Pedidos carregados com sucesso:', data);
      },
      (error) => console.error('Erro ao carregar pedidos:', error)
    );
    this.cdr.detectChanges();
  }

  onPedidoAdded() {
    this.cdr.detectChanges();
    setTimeout(() => {
      this.loadPedidos();
    }, 500)
  }

  deletePedido(pedido: Pedido) {
    if (confirm('Tem certeza que deseja excluir este pedido?')) {
      if (pedido.id !== undefined) {
        this.pedidoService.deletePedido(pedido.id).subscribe(
          () => {
            this.loadPedidos();
          },
          (error) => {
            console.error('Erro ao excluir o pedido:', error);
          }
        );
      } else {
        console.error(
          'ID do produto é undefined. A exclusão não pode ser realizada.'
        );
      }
    }
  }

  verProdutos(pedido: Pedido) {
    this.selectedPedido = pedido;
    this.display = true;
  }

  closeDialog() {
    this.display = false;
  }

  formatarData(data: string | null): string {
    if (!data) {
      return '';
    }

    const date = new Date(data);

    date.setUTCDate(date.getUTCDate() + 1);

    return this.datePipe.transform(date, 'dd/MM/yyyy') || '';
  }

  atualizarStatus(pedido: Pedido): void {
    if (confirm('Tem certeza que deseja marcar este pedido como Finalizado?')) {
      const statusFinalizado = 'Finalizado';
      pedido.status = statusFinalizado;

      this.pedidoService.updatePedido(pedido.id!, pedido).subscribe(
        (updatedPedido) => {
          console.log('Pedido atualizado com sucesso:', updatedPedido);
          this.loadPedidos();
        },
        (error) => {
          console.error('Erro ao atualizar o status do pedido:', error);
        }
      );
    }
  }
}
