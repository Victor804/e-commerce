import { Component, inject, input, InputSignal, output } from '@angular/core';
import { Cart, CartControllerService, Product } from '../../core/api/openapi';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
})
export class ProductCard {
  product: InputSignal<Product> = input.required<Product>();
  cartService = inject(CartControllerService);
  cartUpdated = output<Cart>();

  onClick() {
    this.cartService.addProductToCart(this.product().id!, 1).subscribe({
      next: (cart) => {
        this.cartUpdated.emit(cart);
      },
    });
  }
}
