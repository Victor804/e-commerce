import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductControllerService } from '../../core/api/openapi';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.html',
})
export class ProductDetail {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductControllerService);

  id = Number(this.route.snapshot.paramMap.get('id'));
  product = toSignal(this.productService.getProductById(this.id));
}
