export interface OrderItem {
  products: { title: string };
  flavor?: string;
  quantity: number;
  price_at_time: number;
}

export interface ShippingAddress {
  full_name: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  postal_code: string;
  phone?: string;
}

export interface Order {
  id: string | number;
  created_at: string;
  business_name: string | null;
  status: "pending" | "completed" | "shipped" | "cancelled";
  total_amount: string | number;
  order_items: OrderItem[];
  shipping_address: ShippingAddress;
}
