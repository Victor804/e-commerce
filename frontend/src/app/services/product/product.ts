import { Injectable } from '@angular/core';
import { ProductModel } from '../../models/product.model';
@Injectable({
  providedIn: 'root',
})
export class Product {
  products: ProductModel[] = [];
  currentIndex: number = 1;

  constructor() {
    this.load();
  }

  private save() {
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  private load() {
    const productData = localStorage.getItem('products');
    if (productData) {
      this.products = JSON.parse(productData).map((productJSON: any) =>
        Object.assign(new ProductModel(), productJSON)
      );
      this.currentIndex = Math.max(...this.products.map((product) => product.id));
    } else {
      this.init();
      this.save();
    }
  }

  private init() {
    const product1 = new ProductModel();
    product1.id = this.currentIndex++;
    this.products.push(product1);

    const product2 = new ProductModel();
    product2.id = this.currentIndex++;
    product2.name = 'Smartphone';
    product2.price = 599.99;
    product2.description = '6.5-inch display, 128GB storage, 5G enabled';
    this.products.push(product2);

    const product3 = new ProductModel();
    product3.id = this.currentIndex++;
    product3.name = 'Wireless Headphones';
    product3.price = 199.99;
    product3.description = 'Noise-cancelling over-ear headphones';
    this.products.push(product3);
  }

  getAll(): ProductModel[] {
    return this.products.map((product) => product.copy());
  }

  get(id: number): ProductModel | undefined {
    const product = this.products.find((product) => product.id === id);
    return product ? product.copy() : undefined;
  }

  add(product: ProductModel): ProductModel {
    const productCopy = product.copy();
    productCopy.id = this.currentIndex;
    this.products.push(productCopy.copy());
    this.currentIndex++;
    this.save();
    return productCopy;
  }

  update(product: ProductModel): ProductModel {
    const productCopy = product.copy();

    const productIndex = this.products.findIndex(
      (originalProduct) => originalProduct.id === product.id
    );
    if (productIndex != -1) {
      this.products[productIndex] = productCopy.copy();
      this.save();
    }
    return productCopy;
  }

  delete(id: number) {
    const productIndex = this.products.findIndex((originalProduct) => originalProduct.id === id);
    if (productIndex != -1) {
      this.products.splice(productIndex, 1);
      this.save();
    }
  }
}
