import { CommonModule } from '@angular/common';
import { Component, computed, inject, model } from '@angular/core';
import { ProductCard } from './components/product-card/product-card';
import { ProductModel } from './models/product.model';
import { Product } from './services/product/product';
import { SearchBar } from './components/search-bar/search-bar';

import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [CommonModule, ProductCard, SearchBar],
  templateUrl: 'app.html',
  styleUrl: 'app.css',
})
export class App {
  productService = inject(Product);
  products = toSignal(this.productService.getAll());

  search = model('');

  filteredProducts = computed(() => {
    const searchTerm = this.search().toLowerCase();
    return (
      this.products()?.filter((product) => product.name.toLowerCase().includes(searchTerm)) ?? []
    );
  });
}
