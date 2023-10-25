import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { EmployeeService } from './services/employee.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { AppRoutingModule } from './app-routing.module';
import { AddDeskComponent } from './desk/add-desk/add-desk.component';
import { ListDeskComponent } from './desk/list-desk.component';
import { EmployeeRegisterComponent } from './employee/add-employee/add-employee.component';
import { ListEmployeeComponent } from './employee/list-employee.component';
import { MenuComponent } from './menu/menu.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { ListProductComponent } from './product/list-product.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    EmployeeRegisterComponent,
    EmployeeRegisterComponent,
    AddProductComponent,
    ManageOrderComponent,
    MenuComponent,
    AddDeskComponent,
    ListDeskComponent,
    ListEmployeeComponent,
    AddDeskComponent,
    ListProductComponent,
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
    TableModule,
    CheckboxModule,
    DialogModule
  ],
  providers: [EmployeeService, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
