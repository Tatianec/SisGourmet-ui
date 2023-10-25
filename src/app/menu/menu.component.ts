import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  sidebarVisible: boolean = false;

  menuItems: MenuItem[] = [
    { label: 'Tela Inicial', icon: 'pi pi-home', routerLink: '/home' },
    { label: 'Pedidos', icon: 'pi pi-shopping-cart', routerLink: '/orders' },
    { label: 'Produtos', icon: 'pi pi-box', routerLink: '/product' },
    { label: 'Funcionários', icon: 'pi pi-chart-bar', routerLink: '/employee' }
  ];
}
