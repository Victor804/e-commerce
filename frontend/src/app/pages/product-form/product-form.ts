import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductControllerService } from '../../core/api/openapi';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.html',
})
export class ProductForm {
  errorMessage = '';

  productForm!: FormGroup;
  productService = inject(ProductControllerService);
  private router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      price: [null, [Validators.required, Validators.min(0)]],
    });
  }
  onSubmit() {
    if (this.productForm.valid) {
      const productData = this.productForm.value;

      this.productService.addProduct(productData).subscribe({
        next: (res) => {
          console.log('Product added:', res);
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error adding product:', err);
          this.errorMessage = 'Error adding product';
        },
      });
    }
  }
}
