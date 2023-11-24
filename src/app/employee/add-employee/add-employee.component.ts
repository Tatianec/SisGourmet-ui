import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class EmployeeRegisterComponent implements OnInit {
  employeeForm!: FormGroup;
  displayDialog = false;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      manager: [false]
    });
  }

  salvarFuncionario() {
    if (this.employeeForm.valid) {
      const employeeData = this.employeeForm.value as Employee;
      employeeData.manager = employeeData.manager ? 1 : 0;

      this.employeeService.createEmployee(employeeData).subscribe(
        () => {
          console.log('Funcionário criado com sucesso.');
          this.employeeForm.reset();
          this.displayDialog = true;
        },
        (error) => {
          console.error('Erro ao criar funcionário:', error);
        }
      );
    }
  }

  fecharDialog() {
    this.displayDialog = false; 
    this.router.navigate(['/login']); 
  }
}
