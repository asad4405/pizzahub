export interface OrderType {
    _id?: string;
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
    status?: "pending" | "accepted" | "preparing" | "delivered" | "cancelled";
    createdAt?: string;
}