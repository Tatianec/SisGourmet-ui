import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit{

  employees: Employee[] = [];

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
    if (confirm('Tem certeza que deseja excluir esta mesa?')) {
      if (employee.id !== undefined) {
        this.employeeService.deleteEmployee(employee.id).subscribe(
          () => {
            console.log('Mesa excluída com sucesso.');
            // Atualize a lista de mesas após a exclusão
            this.atualizarFuncionarios();
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
