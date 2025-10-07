import { IProduct } from '../interfaces/product.interface';

export class ProductModel implements IProduct {
  id: number = -1;
  name: string = 'Laptop';
  price: number = 899.99;
  description: string = '15-inch laptop with 16GB RAM and 512GB SSD';

  copy(): ProductModel {
    return Object.assign(new ProductModel(), this);
  }

  static fromJson(productJson: IProduct): ProductModel {
    return Object.assign(new ProductModel(), productJson);
  }

  toJson(): IProduct {
    const productJson: IProduct = Object.assign({}, this);
    delete productJson.id;

    return productJson;
  }
}
