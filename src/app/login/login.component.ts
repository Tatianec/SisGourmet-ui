import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { EmployeeService } from '../services/employee.service';
import { AuthService } from '../services/auth.service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  msgs: Message[] = [];

  constructor(
    private fb: FormBuilder,
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

      this.authService.login(email, password).subscribe(
        (response) => this.handleLoginSuccess(response),
        (error) => this.handleLoginError(error)
      );
    }
  }

  private handleLoginSuccess(response: any) {
    if (response && response.success) {
      console.log(response);
      console.log("response");
      console.log(response.data);

      this.authService.setLoggedInUserId(response.id);
      const loggedInUserId = this.authService.getUserId(); 
      console.log("Usuário logado com ID:", loggedInUserId);
      this.router.navigate(['/home']);
    } else {
      this.handleLoginError(response);
    }
  }

  private handleLoginError(error: any) {
    this.msgs = [
      {
        severity: 'error',
        summary: 'Erro',
        detail: 'Email ou senha incorretos',
      },
    ];
  }



}
