import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Employee } from '../../models/employee.model';
import { Product } from '../../models/product.model';
import { PedidoService } from '../../services/pedido.service';
import { ProductService } from '../../services/product.service';
import { EmployeeService } from '../../services/employee.service';
import { DeskService } from '../../services/desk.service';
import { Desk } from 'src/app/models/desk.model';
import { Pedido } from 'src/app/models/pedido.model';
import { PedidoProductService } from 'src/app/services/pedidoproduct.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-add-pedido',
  templateUrl: './add-pedido.component.html',
  styleUrls: ['./add-pedido.component.css'],
})
export class AddPedidoComponent implements OnInit {
  @Output() pedidoAdded = new EventEmitter<void>();

  employees: Employee[] = [];
  desks: Desk[] = [];
  products: Product[] = [];
  pedidoForm!: FormGroup;
  produtosTemporarios: any[] = [];
  selectedProductPrice: number = 0;

  constructor(
    private fb: FormBuilder,
    private pedidoService: PedidoService,
    private productService: ProductService,
    private employeeService: EmployeeService,
    private deskService: DeskService,
    private pedidoProductService: PedidoProductService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadEmployees();
    this.loadDesks();
    this.loadProducts();

    this.pedidoForm
      .get('productId')
      ?.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((productId: number) =>
          this.productService.getProductById(productId)
        )
      )
      .subscribe(
        (selectedProduct: Product | undefined) => {
          if (selectedProduct) {
            this.pedidoForm.patchValue({ productTotal: selectedProduct.total });
          }
        },
        (error) => {
          console.error('Erro ao obter detalhes do produto:', error);
        }
      );
  }

  initializeForm(): void {
    const defaultEmployeeId =
      this.employees.length > 0 ? this.employees[0].id : null;
    const defaultDeskId = this.desks.length > 0 ? this.desks[0].id : null;

    this.pedidoForm = this.fb.group({
      date: [new Date().toISOString().split('T')[0]],
      employee_id: [defaultEmployeeId, Validators.required],
      desk_id: [defaultDeskId, Validators.required],
      total: [null, [Validators.required, Validators.min(0)]],
      observation: [null, [Validators.required, Validators.maxLength(100)]],
      productId: [null],
      productTotal: [null],
      quantity: [null, Validators.min(0)],
      productIds: this.fb.array([]),
    });
  }

  updateProductTotal(): void {
    const selectedProductId = this.pedidoForm.get('productId')?.value;

    const selectedProduct = this.products.find(
      (product) => product.id === Number(selectedProductId)
    );

    if (selectedProduct) {
      this.pedidoForm.get('productTotal')?.setValue(selectedProduct.total);
    } else {
      console.error(
        'Product not found for the selected ID:',
        selectedProductId
      );
    }
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
      const productIds = this.pedidoForm.get('productIds') as FormArray;

      this.produtosTemporarios.forEach((produtoTemporario) => {
        productIds.push(
          this.fb.group({
            productId: [parseInt(produtoTemporario.nome, 10)],
            productTotal: [produtoTemporario.preco],
            quantity: [produtoTemporario.quantidade],
          })
        );
      });

      const { productId, productTotal, quantity, ...newPedidoWithoutProducts } =
        this.pedidoForm.value;

      const newPedido: Pedido = {
        ...newPedidoWithoutProducts,
        // date: this.formatDate(this.pedidoForm.value.date),
      };

      this.pedidoService.addPedido(newPedido).subscribe((response) => {
        const pedidoId = response.id;

        if (pedidoId !== undefined) {
          this.addProductsToPedido(pedidoId, productIds);

          console.log('Pedido adicionado com sucesso!', response);
          this.pedidoAdded.emit();
          this.limparProdutosTemporarios();
          this.resetForm(); // Adicione esta linha para resetar o formulário
          alert('Pedido adicionado com sucesso!');
        } else {
          console.error('Erro ao obter ID do pedido na resposta do servidor.');
          alert('Erro ao adicionar pedido. Por favor, tente novamente.');
        }
      });
    } else {
      alert('Por favor, preencha todos os campos do formulário corretamente.');
    }
  }

  resetForm(): void {
    this.pedidoForm.reset({
      date: new Date().toISOString().split('T')[0],
      employee_id: this.employees.length > 0 ? this.employees[0].id : null,
      desk_id: this.desks.length > 0 ? this.desks[0].id : null,
    });

    this.produtosTemporarios = [];
    this.atualizarTotalNoFormulario();
  }

  addProductsToPedido(pedidoId: number, productIds: FormArray): void {
    productIds.controls.forEach(
      (
        productControl: AbstractControl,
        index: number,
        array: AbstractControl[]
      ) => {
        if (productControl instanceof FormGroup) {
          const productId = productControl.get('productId')?.value;
          const quantity = productControl.get('quantity')?.value;

          if (productId !== undefined && quantity !== undefined) {
            const pedidoProduct = {
              id_pedido: {
                id: pedidoId,
              },
              id_product: {
                id: productId,
              },

              qtd_sold: quantity,
            };

            this.pedidoProductService
              .createPedidoProduct(pedidoProduct)
              .subscribe(
                (response) => {
                  console.log(
                    'Produto adicionado ao pedido com sucesso!',
                    response
                  );
                },
                (error) => {
                  console.error('Erro ao adicionar produto ao pedido:', error);
                  alert(
                    'Erro ao adicionar produto ao pedido. Por favor, tente novamente.'
                  );
                }
              );
          }
        }
      }
    );
  }

  adicionarProduto(): void {
    const productIdControl = this.pedidoForm.get('productId');
    const productTotalControl = this.pedidoForm.get('productTotal');
    const quantityControl = this.pedidoForm.get('quantity');

    if (
      productIdControl &&
      productIdControl.value !== null &&
      productTotalControl &&
      productTotalControl.value !== null &&
      quantityControl &&
      quantityControl.value !== null
    ) {
      const novoProduto = {
        nome: productIdControl.value,
        preco: productTotalControl.value,
        quantidade: quantityControl.value,
      };

      this.produtosTemporarios.push(novoProduto);

      productIdControl.reset();
      productTotalControl.reset();
      quantityControl.reset();

      productIdControl.setValue(null);
      productIdControl.markAsTouched();

      this.updateProductTotal();

      productIdControl.updateValueAndValidity();

      this.atualizarTotalNoFormulario();
    } else {
      alert('Preencha todos os campos do produto antes de adicionar.');
    }
  }

  limparProdutosTemporarios(): void {
    this.produtosTemporarios = [];
    this.atualizarTotalNoFormulario();
  }

  // formatDate(date: Date): string {
  //   console.log(date);

  //   const d = new Date(date);
  //   return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  // }

  get productIds() {
    return this.pedidoForm.get('productIds');
  }

  atualizarTotalNoFormulario(): void {
    const totalProdutosTemporarios = this.calcularTotalProdutosTemporarios();
    this.pedidoForm.patchValue({ total: totalProdutosTemporarios });
  }

  calcularTotalProdutosTemporarios(): number {
    return this.produtosTemporarios.reduce(
      (total, produto) => total + produto.preco * produto.quantidade,
      0
    );
  }
}
