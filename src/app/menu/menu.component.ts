import { ChangeDetectorRef, Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  sidebarVisible: boolean = false;
  mensagemSucesso: string = '';

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  menuItems: MenuItem[] = [
    { label: 'Tela Inicial', icon: 'pi pi-home', routerLink: '/home' },
    { label: 'Pedidos', icon: 'pi pi-shopping-cart', routerLink: '/orders' },
    { label: 'Produtos', icon: 'pi pi-box', routerLink: '/product' },
    { label: 'Funcionários', icon: 'pi pi-chart-bar', routerLink: '/employee' },
    { label: 'Logout', icon: 'pi pi-power-off', routerLink: '/login' },
  ];

  logout() {
    this.authService.logout();
    this.mensagemSucesso = 'Logout realizado com sucesso!';
    this.messageService.add({
      severity: 'success',
      summary: 'Logout',
      detail: 'Logout realizado com sucesso!',
    });

    this.cdr.detectChanges();
  }
}
