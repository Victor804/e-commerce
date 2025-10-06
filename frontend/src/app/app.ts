import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductCard } from './components/product-card/product-card';
import { Product } from './models/product.model';
import { SearchBar } from './components/search-bar/search-bar';

@Component({
  selector: 'app-root',
  imports: [CommonModule, ProductCard, SearchBar],
  templateUrl: 'app.html',
  styleUrl: 'app.css',
})
export class App {
  products!: Product[];

  search = '';

  constructor() {
    this.products = [];

    const product1 = new Product();
    this.products.push(product1);

    const product2 = new Product();
    product2.name = 'Smartphone';
    product2.price = 599.99;
    product2.description = '6.5-inch display, 128GB storage, 5G enabled';
    this.products.push(product2);

    const product3 = new Product();
    product3.name = 'Wireless Headphones';
    product3.price = 199.99;
    product3.description = 'Noise-cancelling over-ear headphones';
    this.products.push(product3);
  }
}
