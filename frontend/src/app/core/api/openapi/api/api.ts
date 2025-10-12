export * from './cartController.service';
import { CartControllerService } from './cartController.service';
export * from './productController.service';
import { ProductControllerService } from './productController.service';
export const APIS = [CartControllerService, ProductControllerService];
