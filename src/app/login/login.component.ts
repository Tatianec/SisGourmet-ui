import { Component } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  employeeEmail: string = '';
  employeePassword: string = ''; 

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  onLogin() {
    this.employeeService.login(this.employeeEmail, this.employeePassword).subscribe(
      response => {
        console.log("Server response:", response); 

        if (response && response.success) {
          alert("Login bem-sucedido!");
          this.router.navigate(['/welcome']); 
        } else {
          alert("Email ou senha incorretos!");
        }
      },
      error => {
        console.error("Error during login:", error);
        alert("Erro no processo de login!");
      }
    );
  }
}
