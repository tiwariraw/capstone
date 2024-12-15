import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../rtk/store";
import { clearCart } from "../rtk/cartSlice";
import toast from "react-hot-toast";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const { products, totalNoOfItems, totalPrice, tax, taxRate, grandTotal } =
    useSelector((state: RootState) => state.cart);

  const handleClearCart = async () => {
    if (user) {
      try {
        await api.updateUserCart(user.id, []);
        dispatch(clearCart());
        toast.success("Cart cleared!");
      } catch (error) {
        console.error("Error clearing cart:", error);
        toast.error("Failed to clear cart.");
      }
    } else {
      toast.error("User not logged in.");
    }
  };

  const handlePayment = async () => {
    if (user) {
      try {
        // Get the user's current orders
        const userData = await api.getUser(user.id);
        const currentOrders = userData.orders || [];

        const orderId = Math.random().toString(36).substring(2, 15); // Random string of 13 characters

        const newOrder = {
          orderId: orderId,
          createdAt: new Date().toISOString(),
          status: "pending",
          products: products,
        };

        // Updating the logged in user orders with the cart items
        await api.updateUserOrders(user.id, [...currentOrders, newOrder]);

        // Clearing the cart for the logged in user
        await api.updateUserCart(user.id, []);

        dispatch(clearCart());
        toast.success("Payment successfull, Order placed.");
        navigate("/");
      } catch (error) {
        console.error("Error proceeding to payment:", error);
        toast.error("Failed to place order.");
      }
    } else {
      toast.error("User not logged in.");
    }
  };

  return (
    <div className="bg-primary mt-5 rounded text-base">
      <div className="px-6 py-4 space-y-5 text-white">
        <h2 className="text-2xl font-bold">Order Summary</h2>
        <p className="mt-2">Total number of items: {totalNoOfItems}</p>
        <p className="mt-2">Total price: ${totalPrice.toFixed(2)}</p>
        <p className="mt-2">
          Tax: ({taxRate * 100})%: ${tax.toFixed(2)}
        </p>
        <h3 className="font-bold">Grand total: ${grandTotal.toFixed(2)}</h3>

        <div className="mb-6 flex flex-col">
          <button className="btn mb-4 w-44" onClick={handleClearCart}>
            <span className="mr-2">Clear cart</span>
            <i className="ri-delete-bin-7-line"></i>
          </button>
          <button className="btn w-64" onClick={handlePayment}>
            <span className="mr-2">Proceed to payment</span>
            <i className="ri-bank-card-line"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
