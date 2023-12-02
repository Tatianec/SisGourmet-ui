import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
    ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      total: [0, Validators.required],
      estoque: [false],
      qtd_items: [0, Validators.required],
    });
  }

  salvarProduto() {
    if (this.productForm.valid) {
      const productData = {
        ...this.productForm.value,
        estoque: this.productForm.get('estoque')?.value || false
      } as Product;

      this.productService.criarProduto(productData).subscribe(
        () => {
          console.log('Produto criado com sucesso.');
          this.productForm.reset();
        },
        (error) => {
          console.error('Erro ao criar produto:', error);
        }
      );
    }
  }
  
}
