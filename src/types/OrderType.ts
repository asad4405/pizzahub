export interface OrderType {
    menuItemId: string;
    itemName: string;
    price: number;
    vendorId: string;
    vendorName?: string;
    deliveryDate: string;
    deliveryAddress: string;
    note?: string;
    customerId?: string;
    customerName?: string;
    customerEmail?: string;
    customerRole?: string;
}