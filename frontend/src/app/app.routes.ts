import { Routes } from '@angular/router';
import { ProductDetail } from './pages/product-detail/product-detail';
import { ProductList } from './pages/product-list/product-list';
import { CartList } from './pages/cart-list/cart-list';
import { ProductForm } from './pages/product-form/product-form';

export const routes: Routes = [
  { path: '', component: ProductList },
  { path: 'product/:id', component: ProductDetail },
  { path: 'cart', component: CartList },
  { path: 'add-product', component: ProductForm },
];
