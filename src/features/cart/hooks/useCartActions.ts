import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { toast } from "sonner";
import { addItemToCart, removeItemFromCart } from "../redux/cartSlice";

export const useCartActions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.cart);

  const calculateTotal = () =>
    items.reduce(
      (total, item) => total + (item.products?.price || 0) * item.quantity,
      0
    );

  const handleUpdateQuantity = async (productId: number, newQty: number) => {
    if (newQty < 1) return;
    try {
      await dispatch(addItemToCart({ productId, quantity: newQty })).unwrap();
    } catch (err) {
      toast.error("Failed to update quantity");
    }
  };

  const handleRemove = async (productId: number) => {
    try {
      await dispatch(removeItemFromCart(productId)).unwrap();
      toast.success("Item removed");
    } catch (err) {
      toast.error("Failed to remove item");
    }
  };

  return {
    items,
    calculateTotal,
    handleUpdateQuantity,
    handleRemove,
  };
};
