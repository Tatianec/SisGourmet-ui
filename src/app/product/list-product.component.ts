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
  };
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
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      if (product.id !== undefined) {
        this.productService.deleteProduct(product.id).subscribe(
          () => {
            console.log('Produto excluído com sucesso.');
            this.atualizarProdutos();
          },
          (error: any) => {
            console.error('Erro ao excluir o produto:', error);
          }
        );
      } else {
        console.error(
          'ID do produto é undefined. A exclusão não pode ser realizada.'
        );
      }
    }
  }

  openEditDialog(product: Product): void {
    this.visible = true;
    this.selectedProduct = { ...product };
  }

  saveChanges(): void {
    this.productService
      .atualizarProduto(this.selectedProduct.id, this.selectedProduct)
      .subscribe(
        () => {
          console.log('Produto atualizado com sucesso.');

          this.visible = false;

          this.atualizarProdutos();
        },
        (error: any) => {
          console.error('Erro ao atualizar o produto:', error);
        }
      );
  }

  getEstoqueStatus(estoque: boolean): string {
    return estoque ? 'Sim' : 'Não';
  }
}
