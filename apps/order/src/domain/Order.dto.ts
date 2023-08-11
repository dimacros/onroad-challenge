import { Customer } from "./Customer.dto";
import { Product } from "./Product.dto";

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
  FAILED = 'FAILED',
}

export class Order {
  id: number;
  name: string;
  orderDate: Date;
  orderNumber: string;
  total: number;
  note: string;
  customer: Customer;
  status: OrderStatus;
  items: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
}

export class OrderItem {
  id: number;
  order: Order;
  product: Product;
  quantity: number;
  unitPrice: number;
}