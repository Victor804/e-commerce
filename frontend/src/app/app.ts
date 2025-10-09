import { CommonModule } from '@angular/common';
import { Component, computed, inject, model } from '@angular/core';
import { ProductCard } from './components/product-card/product-card';
import { SearchBar } from './components/search-bar/search-bar';
import { toSignal } from '@angular/core/rxjs-interop';

import { ProductControllerService } from './core/api/openapi';
import { Product } from './core/api/openapi';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ProductCard, SearchBar],
  templateUrl: 'app.html',
  styleUrl: 'app.css',
})
export class App {
  productService = inject(ProductControllerService);

  products = toSignal<Product[]>(this.productService.getAllProducts());

  search = model('');

  filteredProducts = computed(() => {
    const searchTerm = this.search().toLowerCase();
    return (
      this.products()?.filter((product) => product.name?.toLowerCase().includes(searchTerm)) ?? []
    );
  });
}
