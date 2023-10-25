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

}
