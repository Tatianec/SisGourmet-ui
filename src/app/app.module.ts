import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { EmployeeService } from './services/employee.service';
import { HomeComponent } from './home/home.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { AppRoutingModule } from './app-routing.module';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarModule } from 'primeng/sidebar';
import { MenubarModule } from 'primeng/menubar';
import { EmployeeRegisterComponent } from './employee-register/employee-register.component';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    EmployeeRegisterComponent,
    EmployeeRegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ButtonModule,
    CardModule,
    ReactiveFormsModule,
    MessagesModule,
    ToastModule,
    BrowserAnimationsModule,
    SidebarModule,
    MenubarModule,
    InputTextModule,
    PasswordModule,
  ],
  providers: [EmployeeService, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
