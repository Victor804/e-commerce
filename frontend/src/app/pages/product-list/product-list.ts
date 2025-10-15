import { Component, computed, inject, model } from '@angular/core';
import {
  Cart,
  CartControllerService,
  Product,
  ProductControllerService,
} from '../../core/api/openapi';
import { toSignal } from '@angular/core/rxjs-interop';
import Keycloak from 'keycloak-js';
import { CommonModule } from '@angular/common';
import { SearchBar } from '../../components/search-bar/search-bar';
import { ProductCard } from '../../components/product-card/product-card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, SearchBar, ProductCard, RouterModule],
  templateUrl: './product-list.html',
})
export class ProductList {
  private readonly keycloak = inject(Keycloak);

  cartService = inject(CartControllerService);
  cart = model<Cart>({ items: [] });

  productService = inject(ProductControllerService);
  products = toSignal<Product[]>(this.productService.getAllProducts());

  search = model('');

  filteredProducts = computed(() => {
    const searchTerm = this.search().toLowerCase();
    return (
      this.products()?.filter((product) => product.name?.toLowerCase().includes(searchTerm)) ?? []
    );
  });

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

  login() {
    this.keycloak.login();
  }

  logout() {
    this.keycloak.logout();
  }

  get isAuthenticated() {
    return !!this.keycloak.token;
  }

  get username() {
    return this.keycloak.tokenParsed?.['preferred_username'];
  }
}
