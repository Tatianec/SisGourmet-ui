import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SortEvent } from 'primeng/api';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css'],
})
export class ListEmployeeComponent implements OnInit {
  employees: Employee[] = [];
  visible: boolean = false;
  selectedEmployee: Employee = {
    id: 0,
    name: '',
    manager: 0,
    email: '',
    password: '',
  };

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.atualizarFuncionarios();

    this.employeeService.onEmployeeChange().subscribe(() => {
      this.atualizarFuncionarios();
    });
  }

  private atualizarFuncionarios() {
    this.employeeService.getEmployees().subscribe((employee) => {
      this.employees = employee;
    });
  }

  deleteEmployee(employee: Employee) {
    if (confirm('Tem certeza que deseja excluir este funcionário?')) {
      if (employee.id !== undefined) {
        this.employeeService.deleteEmployee(employee.id).subscribe(
          () => {
            console.log('Funcionário excluíd com sucesso.');
            this.atualizarFuncionarios();
          },
          (error) => {
            console.error('Erro ao excluir o funcionário:', error);
          }
        );
      } else {
        console.error(
          'ID do funcionário é undefined. A exclusão não pode ser realizada.'
        );
      }
    }
  }

  openEditDialog(employee: Employee): void {
    this.visible = true;
    this.selectedEmployee = { ...employee };
  }

  saveChanges(): void {
    this.employeeService
      .updateEmployee(this.selectedEmployee.id, this.selectedEmployee)
      .subscribe(
        (response) => {
          console.log('Response:', response);
          console.log('Produto atualizado com sucesso.');
          this.visible = false;
          this.atualizarFuncionarios();
        },
        (error: any) => {
          console.error('Erro ao atualizar o produto:', error);
        }
      );
  }
}
