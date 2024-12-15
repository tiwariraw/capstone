import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import bcrypt from "bcryptjs";
import { ProductType } from "../utils/data";
import { CartProduct } from "../rtk/cartSlice";

interface FormData {
  email: string;
  password: string;
  mobile: string;
}

export interface User {
  email: string;
  password: string;
  mobile: string;
  role?: string;
  orders?: ProductType[];
  cart?: CartProduct[];
}

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/; // Minimum 8 characters, at least one letter and one number
  const mobilePattern = /^[6-9]\d{9}$/;

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.get("http://localhost:5000/users");

      const userExists = response.data.some(
        (user: User) => user.email === data.email
      );

      if (userExists) {
        toast.error("Email already exists. Please login.");
        setErrorMessage("Email already exists. Please login.");
        return;
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);

      const newUser: User = {
        email: data.email,
        password: hashedPassword,
        mobile: data.mobile,
        role: "user",
        orders: [],
        cart: [],
      };

      await axios.post("http://localhost:5000/users", newUser);
      toast.success("Registration successful. Please log in.");

      reset();

      navigate("/login");
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section
      className="h-screen flex items-center justify-center bg-center"
      style={{
        backgroundImage:
          "url('https://t4.ftcdn.net/jpg/04/60/71/01/360_F_460710131_YkD6NsivdyYsHupNvO3Y8MPEwxTAhORh.jpg')",
      }}
    >
      <div className="max-w-sm border shadow bg-white mx-auto p-8">
        <h2 className="text-2xl font-semibold pt-5">Please Register</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 max-w-sm mx-auto p-8"
        >
          <input
            required
            type="email"
            id="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: emailPattern,
                message: "Invalid email format",
              },
            })}
            className="w-full bg-gray-100 focus:outline-none px-5 py-3"
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}

          <input
            required
            type="password"
            id="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: passwordPattern,
                message:
                  "Password must be at least 8 characters, and contain at least one letter and one number",
              },
            })}
            className="w-full bg-gray-100 focus:outline-none px-5 py-3"
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}

          <input
            required
            type="text"
            id="mobile"
            placeholder="Mobile Number"
            {...register("mobile", {
              required: "Mobile number is required",
              pattern: {
                value: mobilePattern,
                message:
                  "Invalid mobile number. Must start with 6 to 9 and be 10 digits.",
              },
            })}
            className="w-full bg-gray-100 focus:outline-none px-5 py-3"
          />
          {errors.mobile && (
            <span className="text-red-500">{errors.mobile.message}</span>
          )}

          <button
            type="submit"
            className="w-full mt-5 bg-primary-dark text-white hover:shadow-lg font-medium py-3 rounded-md"
          >
            Register
          </button>

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </form>

        <p className="italic text-sm text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary-dark px-1 underline hover:text-blue-800 hover:shadow-sm"
          >
            Login
          </Link>{" "}
        </p>
      </div>
    </section>
  );
};

export default Register;
