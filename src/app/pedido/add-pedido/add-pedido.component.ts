import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../../models/employee.model';
import { Product } from '../../models/product.model';
import { PedidoService } from '../../services/pedido.service';
import { ProductService } from '../../services/product.service';
import { EmployeeService } from '../../services/employee.service';
import { DeskService } from '../../services/desk.service';
import { Desk } from 'src/app/models/desk.model';
import { Pedido } from 'src/app/models/pedido.model';

@Component({
  selector: 'app-add-pedido',
  templateUrl: './add-pedido.component.html',
  styleUrls: ['./add-pedido.component.css'],
})
export class AddPedidoComponent implements OnInit {
  employees: Employee[] = [];
  desks: Desk[] = [];
  products: Product[] = [];
  pedidoForm!: FormGroup;
  produtosTemporarios: any[] = [];

  @Output() pedidoAdded = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private pedidoService: PedidoService,
    private productService: ProductService,
    private employeeService: EmployeeService,
    private deskService: DeskService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadEmployees();
    this.loadDesks();
    this.loadProducts();
  }

  initializeForm(): void {
    this.pedidoForm = this.fb.group({
      date: [null, Validators.required],
      employee_id: [null, Validators.required],
      desk_id: [null, Validators.required],
      total: [null, [Validators.required, Validators.min(0)]],
      observation: [null, [Validators.required, Validators.maxLength(100)]],
      productId: [null],
      productTotal: [null],
      quantity: [null, Validators.min(0)],
      productIds: this.fb.array([]),
    });
  }

  get productQuantities(): FormArray {
    return this.pedidoForm.get('productQuantities') as FormArray;
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (data) => (this.employees = data),
      (error) => console.error('Erro ao carregar funcionários:', error)
    );
  }

  loadDesks(): void {
    this.deskService.getDesks().subscribe(
      (data) => (this.desks = data),
      (error) => console.error('Erro ao carregar mesas:', error)
    );
  }

  loadProducts(): void {
    this.productService.listarProdutos().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => console.error('Erro ao carregar produtos:', error)
    );
  }

  onSubmit(): void {
    if (this.pedidoForm.valid) {
      const productIds = this.pedidoForm.get(
        'productIds'
      ) as FormArray;

      // Adicionar produtos temporários aos produtos selecionados
      this.produtosTemporarios.forEach((produtoTemporario) => {
        productIds.push(
          this.fb.group({
            productId: [parseInt(produtoTemporario.nome, 10)],
            productTotal: [produtoTemporario.preco],
            quantity: [produtoTemporario.quantidade],
          })
        );
      });

      // Remover os campos indesejados antes de criar o objeto newPedido
      const { productId, productTotal, quantity, ...newPedidoWithoutProducts } =
        this.pedidoForm.value;

      const newPedido: Pedido = {
        ...newPedidoWithoutProducts,
        date: this.formatDate(this.pedidoForm.value.date),
      };

      this.pedidoService.addPedido(newPedido).subscribe(
        (response) => {
          console.log('Pedido adicionado com sucesso!', response);
          this.pedidoAdded.emit();
          this.pedidoForm.reset();
          this.limparProdutosTemporarios(); // Limpar produtos temporários após o envio
          alert('Pedido adicionado com sucesso!');
        },
        (error) => {
          console.error('Erro ao adicionar pedido:', error);
          alert('Erro ao adicionar pedido. Por favor, tente novamente.');
        }
      );
    } else {
      alert('Por favor, preencha todos os campos do formulário corretamente.');
    }
  }

  adicionarProduto(): void {
    const novoProduto = {
      nome: this.pedidoForm.get('productId')?.value, // Ajuste conforme a estrutura do seu modelo
      preco: this.pedidoForm.get('productTotal')?.value,
      quantidade: this.pedidoForm.get('quantity')?.value,
    };

    this.produtosTemporarios.push(novoProduto);

    // Limpar os campos do formulário de produtos após adicionar
    this.pedidoForm.get('productId')?.reset();
    this.pedidoForm.get('productTotal')?.reset();
    this.pedidoForm.get('quantity')?.reset();
  }

  limparProdutosTemporarios(): void {
    this.produtosTemporarios = [];
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    return `${d.getDate() + 1}/${d.getMonth() + 1}/${d.getFullYear()}`;
  }

  get productIds() {
    return this.pedidoForm.get('productIds');
  }
}
