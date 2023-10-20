import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.css']
})
export class EmployeeRegisterComponent implements OnInit {
  employeeForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    // Implemente a lógica de envio do formulário para o servidor aqui
  }
}
