import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { EmployeeService } from '../services/employee.service';
import { AuthService } from '../services/auth.service'; // Importe o AuthService
import { Message } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  msgs: Message[] = [];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private authService: AuthService, 
    private router: Router,
    private msgService: MessageService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      this.employeeService.login(email, password).subscribe(
        (response) => this.handleLoginResponse(response),
        (error) => this.handleError(error)
      );
    }
  }

  private handleLoginResponse(response: any) {
    console.log(response);
    if (response && response.success) {
      this.authService.setLoggedInUserId(response.id); 
      this.router.navigate(['/home']);
    } else {
      this.msgs = [];
      this.msgs.push({
        severity: 'error',
        summary: 'Erro',
        detail: 'Email ou senha incorretos',
      });
    }
  }

  private handleError(error: any) {
    this.msgs = [];
    this.msgs.push({
      severity: 'error',
      summary: 'Erro',
      detail: 'Ocorreu um erro durante a tentativa de login. Por favor, tente novamente.',
    });
  }
}
