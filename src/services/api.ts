import axios from "axios";
import { BlogType, ProductType, BASE_URL } from "../utils/data";
import { CartProduct } from "../rtk/cartSlice";
import { OrderProduct } from "../pages/dashboard/user_dashboard/UserOrders";

const api = {
  // get the user data by id
  getUser: async (userId: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  },
  updateUser: async (
    userId: string,
    updatedUserDetails: { email: string; mobile: string }
  ) => {
    try {
      await axios.patch(`${BASE_URL}/users/${userId}`, updatedUserDetails);

      const response = await axios.get(`${BASE_URL}/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error updating user data:", error);
      throw error;
    }
  },
  getProducts: async (): Promise<ProductType[] | undefined> => {
    try {
      const response = await axios.get(`${BASE_URL}/products`);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(err.message);
      } else if (err instanceof Error) {
        console.error(err.message);
      }
      console.error("An unknown error occurred");
    }
  },
  getProduct: async (id: string): Promise<ProductType | undefined> => {
    try {
      const response = await axios.get(`${BASE_URL}/products/${id}`);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.message);
      } else if (err instanceof Error) {
        console.log(err.message);
      }
      console.error("An unknown error occurred");
    }
  },
  getBlogs: async (): Promise<BlogType[] | undefined> => {
    try {
      const response = await axios.get(`${BASE_URL}/blogs`);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.message);
      } else if (err instanceof Error) {
        console.log(err.message);
      }
      console.error("An unknown error occurred");
    }
  },
  addToUserCart: async (id: string, product: ProductType): Promise<void> => {
    try {
      const response = await axios.get(`${BASE_URL}/users/${id}`);
      const user = response.data;

      if (!user) {
        throw new Error(`User with ID ${id} not found`);
      }

      const updatedCart = [...(user.cart || []), product];

      await axios.patch(`${BASE_URL}/users/${id}`, {
        cart: updatedCart,
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(err.message);
      } else if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("An error occurred while adding to cart.");
      }
    }
  },
  updateUserCart: async (userId: string, updatedCart: CartProduct[]) => {
    try {
      const response = await axios.patch(`${BASE_URL}/users/${userId}`, {
        cart: updatedCart,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating user cart:", error);
      throw error;
    }
  },
  // get all the user orders (used in UserOrders component)
  getOrders: async (userId: string): Promise<OrderProduct[] | undefined> => {
    try {
      const response = await axios.get(`${BASE_URL}/users/${userId}`);
      const user = response.data;

      if (!user || !user.orders) {
        console.warn(`No orders found for user with ID: ${userId}`);
        return [];
      }

      return user.orders;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(err.message);
      } else if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("An unknown error occurred while fetching orders.");
      }
    }
  },
  // Updating the logged in user orders
  updateUserOrders: async (userId: string, updatedOrders: CartProduct[]) => {
    try {
      const response = await axios.patch(`${BASE_URL}/users/${userId}`, {
        orders: updatedOrders,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating user orders:", error);
      throw error;
    }
  },
  //get user stats, total items purchased and total amount spent
  getStats: async (userId: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/${userId}`);
      const user = response.data;

      if (!user) {
        throw new Error(`User with ID ${userId} not found`);
      }

      let totalItems = 0;
      let totalAmount = 0;

      user.orders.forEach((order: OrderProduct) => {
        order.products.forEach((product: CartProduct) => {
          totalItems += product.quantity;
          totalAmount += product.price * product.quantity;
        });
      });

      return {
        totalItems,
        totalAmount,
      };
    } catch (error) {
      console.error("Error fetching user stats:", error);
      throw error;
    }
  },
};

export { api };
