export * from './cartController.service';
import { CartControllerService } from './cartController.service';
export * from './productController.service';
import { ProductControllerService } from './productController.service';
export * from './userController.service';
import { UserControllerService } from './userController.service';
export const APIS = [CartControllerService, ProductControllerService, UserControllerService];
