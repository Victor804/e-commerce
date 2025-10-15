import { CommonModule } from '@angular/common';
import { Component, computed, inject, model, signal } from '@angular/core';
import { ProductCard } from '../../components/product-card/product-card';
import { Cart, CartControllerService } from '../../core/api/openapi';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart-list',
  imports: [CommonModule, RouterModule, ProductCard],
  templateUrl: './cart-list.html',
})
export class CartList {
  cartService = inject(CartControllerService);
  cart = signal<Cart>({});

  totalPrice = computed(
    () =>
      this.cart().items?.reduce(
        (sum, item) => sum + (item.product?.price ?? 0) * (item.quantity ?? 1),
        0
      ) ?? 0
  );

  constructor() {
    this.loadCart();
  }

  loadCart() {
    this.cartService.geCart().subscribe({
      next: (cart: Cart) => {
        this.cart.set(cart);
      },
    });
  }
}
