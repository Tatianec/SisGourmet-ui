import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEmployeeComponent } from './employee/list-employee.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ListProductComponent } from './product/list-product.component';
import { ListDeskComponent } from './desk/list-desk.component';
import { ListaPedidosComponent } from './pedido/lista-pedidos/lista-pedidos.component';
import { AddPedidoComponent } from './pedido/add-pedido/add-pedido.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'employee', component: ListEmployeeComponent},
  {path: 'product', component: ListProductComponent},
  {path: 'desk', component: ListDeskComponent},
  {path: 'orders', component: ListaPedidosComponent},
  {path: 'addPedido', component: AddPedidoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
