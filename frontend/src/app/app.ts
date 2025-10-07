import { CommonModule } from '@angular/common';
import { Component, computed, inject, model } from '@angular/core';
import { ProductCard } from './components/product-card/product-card';
import { ProductModel } from './models/product.model';
import { Product } from './services/product/product';
import { SearchBar } from './components/search-bar/search-bar';

@Component({
  selector: 'app-root',
  imports: [CommonModule, ProductCard, SearchBar],
  templateUrl: 'app.html',
  styleUrl: 'app.css',
})
export class App {
  productService = inject(Product);
  products!: ProductModel[];

  search = model('');

  filteredProducts = computed(() => {
    return this.products.filter((product) => product.name.includes(this.search()));
  });

  constructor() {
    this.products = this.productService.getAll();
  }
}
