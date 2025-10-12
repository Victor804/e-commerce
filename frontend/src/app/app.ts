import { CommonModule } from '@angular/common';
import { Component, computed, inject, model, signal } from '@angular/core';
import { ProductCard } from './components/product-card/product-card';
import { SearchBar } from './components/search-bar/search-bar';
import { toSignal } from '@angular/core/rxjs-interop';
import { Cart, ProductControllerService, Product, CartControllerService } from './core/api/openapi';
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ProductCard, SearchBar],
  templateUrl: 'app.html',
})
export class App {
  private readonly keycloak = inject(Keycloak);

  cartService = inject(CartControllerService);

  productService = inject(ProductControllerService);
  products = toSignal<Product[]>(this.productService.getAllProducts());
  cartCount = signal(0);

  search = model('');

  filteredProducts = computed(() => {
    const searchTerm = this.search().toLowerCase();
    return (
      this.products()?.filter((product) => product.name?.toLowerCase().includes(searchTerm)) ?? []
    );
  });

  constructor() {
    this.loadCartCount();
  }

  loadCartCount() {
    this.cartService.geCart().subscribe({
      next: (cart: Cart) => {
        const count = cart.items?.reduce((total, item) => total + (item.quantity ?? 0), 0) ?? 0;
        this.cartCount.set(count);
      },
      error: () => {
        this.cartCount.set(0);
      },
    });
  }

  onCartUpdated(cart: Cart) {
    const count = cart.items?.reduce((total, item) => total + (item.quantity ?? 0), 0) ?? 0;
    this.cartCount.set(count);
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
