import { inject, Injectable } from '@angular/core';
import { ProductModel } from '../../models/product.model';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../../interfaces/product.interface';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class Product {
  BASE_URL = 'http://localhost:8080/products';
  private http = inject(HttpClient);

  getAll(): Observable<ProductModel[]> {
    return this.http.get<IProduct[]>(this.BASE_URL).pipe(
      map((productDictArray) => {
        return productDictArray.map<ProductModel>((productDict) =>
          ProductModel.fromJson(productDict)
        );
      })
    );
  }

  get(id: number): Observable<ProductModel> {
    return this.http
      .get<IProduct>(this.BASE_URL + '/' + id)
      .pipe(map((productDict) => ProductModel.fromJson(productDict)));
  }

  add(product: ProductModel): Observable<ProductModel> {
    return this.http
      .post<IProduct>(this.BASE_URL, product.toJson())
      .pipe(map((productDict) => ProductModel.fromJson(productDict)));
  }

  update(product: ProductModel): Observable<ProductModel> {
    return this.http
      .put<IProduct>(this.BASE_URL + '/' + product.id, product.toJson())
      .pipe(map((productDict) => ProductModel.fromJson(productDict)));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.BASE_URL + '/' + id);
  }
}
