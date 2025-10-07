import { Component, input, InputSignal } from '@angular/core';
import { ProductModel } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
})
export class ProductCard {
  product: InputSignal<ProductModel> = input(new ProductModel());
}
