import { Component } from '@angular/core';
import { ProductCard } from './components/product-card/product-card';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  imports: [ProductCard],
  templateUrl: 'app.html',
  styleUrl: 'app.css',
})
export class App {
  product1!: Product;
  product2!: Product;

  constructor() {
    this.product1 = new Product();
    this.product2 = new Product();
    this.product2.name = 'Smartphone';
    this.product2.price = 599.99;
    this.product2.description = '6.5-inch display, 128GB storage, 5G enabled';
  }
}
