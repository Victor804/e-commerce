import { Component, input, InputSignal } from '@angular/core';
import { Product } from '../../core/api/openapi';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
})
export class ProductCard {
  product: InputSignal<Product> = input.required<Product>();
}
