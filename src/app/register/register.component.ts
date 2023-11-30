import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  employeeForm!: FormGroup;
  displayDialog = false;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      manager: [false],
    });
  }

  onRegister() {
    if (this.employeeForm.valid) {
      const employeeData = this.employeeForm.value as Employee;
      employeeData.manager = employeeData.manager ? 1 : 0;

      this.employeeService.createEmployee(employeeData).subscribe(
        () => {
          console.log('Funcionário criado com sucesso.');
          this.employeeForm.reset();
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Erro ao criar funcionário:', error);
        }
      );
    }
  }
}
