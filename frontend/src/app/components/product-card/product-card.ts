import {
  Component,
  computed,
  inject,
  input,
  InputSignal,
  model,
  output,
  signal,
} from '@angular/core';
import { Cart, CartControllerService, Product } from '../../core/api/openapi';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
})
export class ProductCard {
  product: InputSignal<Product> = input.required<Product>();
  cartService = inject(CartControllerService);
  cart = model<Cart>();

  quantity = computed(() => {
    const item = this.cart()?.items?.find((i) => i.product?.id === this.product().id);
    return item?.quantity ?? 0;
  });

  add() {
    this.cartService.addProductToCart(this.product().id!, 1).subscribe({
      next: (cart) => this.cart.set(cart),
    });
  }

  remove() {
    this.cartService.decreaseProductQuantityInCart(this.product().id!, 1).subscribe({
      next: (cart) => {
        this.cart.set(cart);
        console.log(cart);
      },
    });
  }

  setQuantity(qty: number) {
    const delta = qty - this.quantity();
    if (delta > 0) {
      this.cartService.addProductToCart(this.product().id!, delta).subscribe({
        next: (cart) => this.cart.set(cart),
      });
    } else if (delta < 0) {
      this.cartService.decreaseProductQuantityInCart(this.product().id!, -delta).subscribe({
        next: (cart) => this.cart.set(cart),
      });
    }
  }
}
