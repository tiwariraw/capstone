import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import bcrypt from "bcryptjs";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../rtk/authslice";

interface FormData {
  email: string;
  password: string;
}

interface User {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();
  console.log(location.state); // coming from which route

  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      // Find the user by email
      const user = response.data.find(
        (user: User) => user.email === data.email
      );

      if (user) {
        // Compare the entered password with the stored hashed password
        const isPasswordCorrect = await bcrypt.compare(
          data.password,
          user.password
        );

        if (isPasswordCorrect) {
          toast.success("Loged in successfully");
          sessionStorage.setItem("user", JSON.stringify(user));
          console.log(user);
          dispatch(setUser({ user }));
          navigate("/");
        } else {
          toast.error("Invalid credentials");
          setErrorMessage("Invalid credentials");
          setTimeout(() => {
            setErrorMessage("");
          }, 2000);
        }
      } else {
        toast.error("User not found");
        setErrorMessage("User not found");
      }
    } catch (error) {
      console.log("Error checking login:", error);
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
        <h2 className="text-2xl font-semibold pt-5">Please Login</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 max-w-sm mx-auto p-8"
        >
          <input
            required
            type="email"
            id="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
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
            {...register("password", { required: "Password is required" })}
            className="w-full bg-gray-100 focus:outline-none px-5 py-3"
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}

          <button
            type="submit"
            className="w-full mt-5 bg-primary-dark text-white hover:shadow-lg font-medium py-3 rounded-md"
          >
            SignIn
          </button>

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </form>

        <p className=" italic text-sm text-center">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-primary-dark px-1 underline hover:text-blue-800 hover:shadow-sm"
          >
            Register
          </Link>{" "}
          here.
        </p>
      </div>
    </section>
  );
};

export default Login;
