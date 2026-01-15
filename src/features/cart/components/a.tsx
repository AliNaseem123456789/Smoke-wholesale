// Near your other imports
import axios from "axios";
import { Save } from "lucide-react";

// Inside the CartPage component...
const [isSaving, setIsSaving] = useState(false);

const handleSaveCart = async () => {
  if (!isAuthenticated) {
    toast.error("Login to save this cart as a template");
    return;
  }

  const cartName = prompt(
    "Enter a name for this saved cart (e.g. Weekly Restock):"
  );
  if (!cartName) return;

  setIsSaving(true);
  try {
    await axios.post(
      "http://localhost:5000/api/auth/save-cart-template",
      {
        name: cartName,
        items: items.map((i) => ({
          product_id: i.product_id,
          quantity: i.quantity,
        })),
        totalPrice: calculateTotal(),
      },
      { withCredentials: true }
    );
    toast.success("Cart saved to your templates!");
  } catch (err) {
    toast.error("Failed to save cart");
  } finally {
    setIsSaving(false);
  }
};
