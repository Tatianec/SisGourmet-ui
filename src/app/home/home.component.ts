import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  sidebarVisible: boolean = false;

  menuItems: MenuItem[] = [
    { label: 'Tela Inicial', icon: 'pi pi-home', routerLink: '/tela-inicial' },
    { label: 'Pedidos', icon: 'pi pi-shopping-cart', routerLink: '/pedidos' },
    { label: 'Produtos', icon: 'pi pi-box', routerLink: '/produtos' },
    { label: 'Relatórios', icon: 'pi pi-chart-bar', routerLink: '/relatorios' }
  ];
}
