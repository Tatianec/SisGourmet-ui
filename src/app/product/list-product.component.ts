import { Component } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css'],
})
export class ListProductComponent {
  products: Product[] = [];
  visible: boolean = false;
  selectedProduct: Product = {
    id: 0,
    name: '',
    description: '',
    qtd_items: 0,
    total: 0,
  }; // Inicialize conforme necessário
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.atualizarProdutos();

    this.productService.onProdutoAdicionado().subscribe(() => {
      this.atualizarProdutos();
    });
  }

  private atualizarProdutos() {
    this.productService.listarProdutos().subscribe((product) => {
      this.products = product;
    });
  }

  deleteProduct(product: Product) {
    if (confirm('Tem certeza que deseja excluir esta mesa?')) {
      if (product.id !== undefined) {
        this.productService.deleteProduct(product.id).subscribe(
          () => {
            console.log('Mesa excluída com sucesso.');
            // Atualize a lista de mesas após a exclusão
            this.atualizarProdutos();
          },
          (error: any) => {
            console.error('Erro ao excluir a mesa:', error);
          }
        );
      } else {
        console.error(
          'ID da mesa é undefined. A exclusão não pode ser realizada.'
        );
      }
    }
  }

  openEditDialog(product: Product): void {
    this.visible = true;
    this.selectedProduct = { ...product };
  }

  saveChanges(): void {
    // Chama o serviço para atualizar o produto
    this.productService
      .atualizarProduto(this.selectedProduct.id, this.selectedProduct)
      .subscribe(
        () => {
          console.log('Produto atualizado com sucesso.');
          // Fecha o p-dialog após salvar as alterações
          this.visible = false;
          // Atualiza a lista de produtos
          this.atualizarProdutos();
        },
        (error: any) => {
          console.error('Erro ao atualizar o produto:', error);
          // Adicione a lógica de tratamento de erro, se necessário
        }
      );
  }

  // cancelEdit(): void {
  //   this.visible = false;
  // }
}
