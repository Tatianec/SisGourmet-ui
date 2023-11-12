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
      selectedProducts: this.fb.array([]),
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
        const productControls = this.pedidoForm.get(
          'selectedProducts'
        ) as FormArray;
        data.forEach((product) => {
          productControls.push(
            this.fb.group({
              productId: product.id,
              productTotal: product.total,
              quantity: 0,
            })
          );
        });
      },
      (error) => console.error('Erro ao carregar produtos:', error)
    );
  }

  onSubmit(): void {
    if (this.pedidoForm.valid) {

        if (this.pedidoForm.get('selectedProducts')) {
            const productData = (this.pedidoForm.get('selectedProducts') as FormArray).value;
            const selectedProducts = productData
                .filter((p: { productId: number; quantity: number }) => p.quantity > 0)
                .map((p: { id_product: number; quantity: number }) => ({ id_product: p.id_product, qtd_sold: p.quantity }));


            const newPedido: Pedido = {
                ...this.pedidoForm.value,
                date: this.formatDate(this.pedidoForm.value.date),
                products: selectedProducts
            };

            this.pedidoService.addPedido(newPedido).subscribe(
                response => {
                    console.log('Pedido adicionado com sucesso!', response);
                    this.pedidoAdded.emit();
                    this.pedidoForm.reset();
                    alert('Pedido adicionado com sucesso!');
                },
                error => {
                    console.error('Erro ao adicionar pedido:', error);
                    alert('Erro ao adicionar pedido. Por favor, tente novamente.');
                }
            );
        }
    } else {
        alert('Por favor, preencha todos os campos do formulário corretamente.');
    }
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    return `${d.getDate() + 1}/${d.getMonth() + 1}/${d.getFullYear()}`;
  }

  get selectedProducts(): FormArray {
    return this.pedidoForm.get('selectedProducts') as FormArray;
  }



}
