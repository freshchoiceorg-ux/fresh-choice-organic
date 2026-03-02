import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Order {
    customerName: string;
    status: string;
    paymentMethod: string;
    createdAt: bigint;
    orderId: bigint;
    totalAmount: bigint;
    address: string;
    phone: string;
    items: Array<OrderItem>;
    upiTransactionRef: string;
}
export interface Product {
    id: string;
    name: string;
    price: bigint;
}
export interface OrderItem {
    productId: string;
    productName: string;
    quantity: bigint;
    unitPrice: bigint;
    totalPrice: bigint;
}
export interface backendInterface {
    calculate_total_amount(items: Array<OrderItem>): Promise<bigint>;
    cancel_order(orderId: bigint): Promise<boolean>;
    create_order_item(productId: string, quantity: bigint): Promise<OrderItem | null>;
    find_product_by_id(productId: string): Promise<Product | null>;
    get_all_orders(): Promise<Array<Order>>;
    get_all_products(): Promise<Array<Product>>;
    get_completed_orders_count(): Promise<bigint>;
    get_order_by_id(orderId: bigint): Promise<Order | null>;
    get_order_status(orderId: bigint): Promise<string>;
    get_orders_by_phone(phone: string): Promise<Array<Order>>;
    get_orders_count(): Promise<bigint>;
    place_order(customerName: string, phone: string, address: string, items: Array<OrderItem>, totalAmount: bigint, paymentMethod: string, upiTransactionRef: string): Promise<bigint>;
    update_order_status(orderId: bigint, newStatus: string): Promise<boolean>;
}
