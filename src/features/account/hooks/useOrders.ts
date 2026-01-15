import { useState, useEffect } from "react";
import axios from "axios";
import { Order } from "../types/order.types";

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/orders/my-orders",
        {
          withCredentials: true,
        }
      );
      setOrders(res.data.data);
    } catch (err) {
      console.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return { orders, loading, refresh: fetchOrders };
};
