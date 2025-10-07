export class ProductModel {
  id: number = -1;
  name: string = 'Laptop';
  price: number = 899.99;
  description: string = '15-inch laptop with 16GB RAM and 512GB SSD';

  copy(): ProductModel {
    return Object.assign(new ProductModel(), this);
  }
}
