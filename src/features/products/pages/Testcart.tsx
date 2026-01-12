import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/cart";

export default function Testcart() {
  const [cart, setCart] = useState([]);
  const [productId, setProductId] = useState("");
  const [addQty, setAddQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL, {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch cart");

      const data = await res.json();
      setCart(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async () => {
    if (!productId) return alert("Product ID required");

    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API_URL}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          productId,
          quantity: addQty,
        }),
      });

      if (!res.ok) throw new Error("Add to cart failed");

      setProductId("");
      setAddQty(1);
      fetchCart();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;

    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API_URL}/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ quantity }),
      });

      if (!res.ok) throw new Error("Update failed");

      fetchCart();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API_URL}/${productId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok && res.status !== 204) throw new Error("Delete failed");

      fetchCart();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div
      style={{ maxWidth: 500, margin: "40px auto", fontFamily: "sans-serif" }}
    >
      <h2>🛒 Cart</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading...</p>}

      {/* Add to cart */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          placeholder="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
        <input
          type="number"
          min="1"
          value={addQty}
          onChange={(e) => setAddQty(Number(e.target.value))}
        />
        <button onClick={addToCart} disabled={loading}>
          Add
        </button>
      </div>

      <hr />

      {/* Cart items */}
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        cart.map((item) => (
          <div
            key={item.product_id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 10,
            }}
          >
            <span style={{ flex: 1 }}>{item.product_id}</span>

            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) =>
                updateQuantity(item.product_id, Number(e.target.value))
              }
              style={{ width: 60 }}
            />

            <button
              onClick={() => removeFromCart(item.product_id)}
              disabled={loading}
            >
              ❌
            </button>
          </div>
        ))
      )}
    </div>
  );
}
