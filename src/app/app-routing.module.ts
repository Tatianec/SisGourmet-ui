import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEmployeeComponent } from './employee/list-employee.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ListProductComponent } from './product/list-product.component';
import { ListDeskComponent } from './desk/list-desk.component';
import { ListaPedidosComponent } from './pedido/lista-pedidos/lista-pedidos.component';
import { AddPedidoComponent } from './pedido/add-pedido/add-pedido.component';
import { AuthGuard } from './authguard/authguard.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'employee', component: ListEmployeeComponent, canActivate: [AuthGuard]},
  {path: 'product', component: ListProductComponent, canActivate: [AuthGuard]  },
  {path: 'desk', component: ListDeskComponent, canActivate: [AuthGuard]},
  {path: 'orders', component: ListaPedidosComponent, canActivate: [AuthGuard]},
  {path: 'addPedido', component: AddPedidoComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
