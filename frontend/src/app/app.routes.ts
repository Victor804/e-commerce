import { Routes } from '@angular/router';
import { ProductDetail } from './pages/product-detail/product-detail';
import { ProductList } from './pages/product-list/product-list';
import { CartList } from './pages/cart-list/cart-list';

export const routes: Routes = [
  { path: '', component: ProductList },
  { path: 'product/:id', component: ProductDetail },
  { path: 'cart', component: CartList },
];
