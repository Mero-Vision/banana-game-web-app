import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loginImg from "../../assets/loginbg.jpg";

const LoginPage = () => {
   const navigate = useNavigate();
   // const dispatch = useDispatch();

   const [loginData, setLoginData] = useState({
      email: "",
      password: "",
   });

   const [errors, setErrors] = useState({});

   const handleChange = (e) => {
      const { name, value } = e.target;
      setLoginData({
         ...loginData,
         [name]: value,
      });
   };

   const validate = () => {
      const errors = {};
      if (!loginData.email) errors.email = "Email is required";
      if (!loginData.password)
         errors.password = "Password is required";
      return errors;
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      const validationErrors = validate();
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length === 0) {
         try {
            const response = await axios.post(
               "http://localhost:8000/login/",
               loginData
            );
            console.log(response);

            const { token } = response.data; // Ensure you have user_role from response
            localStorage.setItem("token", token);

            // dispatch(login({ token })); // Dispatch the token

            toast.success("Login successful");

            // Redirect to different dashboards based on the role
            setTimeout(() => {
               navigate("/dashboard");
            }, 2000);
         } catch (error) {
            if (error.response && error.response.status === 401) {
               toast.error(
                  "Incorrect email or password. Please try again."
               );
            } else {
               toast.error(
                  "Something went wrong. Please try again later."
               );
            }
         }
      }
   };

   const handleSignUpClick = () => {
      navigate("/signup");
   };

   return (
      <div
         style={{
            display: "grid",
            width: "100%",
            gridTemplateColumns: "1fr 1fr",
         }}
         //  className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-200 to-yellow-400"
      >
         <div>
            <img
               src={loginImg} // Replace with your image URL
               alt="Descriptive Alt Text"
               style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
               }}
            />
         </div>
         <div
            style={{
               background: "linear-gradient(90deg, #941E79, #57309E)",
            }}
            className="flex items-center justify-center min-h-screen bg-gradient-to-br"
         >
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg backdrop-blur-md transform transition duration-300 ">
               <h2
                  style={{ fontWeight: "500", color: "#222163" }}
                  className="text-4xl font-bold text-center"
               >
                  Welcome Back
               </h2>
               <p
                  className="text-center text-gray-600"
                  style={{ marginBottom: "20px" }}
               >
                  Please login to your account
               </p>

               <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="relative">
                     <input
                        type="email"
                        name="email"
                        value={loginData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="mb-1 w-full px-4 py-3 text-gray-800 placeholder-gray-400 bg-purple-50 rounded-lg border border-purple-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                     />
                     {errors.email && (
                        <p className="text-red-500 text-sm">
                           {errors.email}
                        </p>
                     )}
                  </div>

                  <div className="relative">
                     <input
                        type="password"
                        name="password"
                        value={loginData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="mb-4 w-full px-4 py-3 text-gray-800 placeholder-gray-400 bg-purple-50 rounded-lg border border-purple-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                     />
                     {errors.password && (
                        <p className="text-red-500 text-sm">
                           {errors.password}
                        </p>
                     )}
                  </div>

                  <div>
                     <button
                        style={{
                           background:
                              "linear-gradient(90deg, #222163, #57309E)",
                        }}
                        type="submit"
                        className="w-full px-4 py-3 font-semibold text-white bg-gradient-to-r  rounded-lg shadow-md hover:shadow-xl transform transition duration-300 hover:scale-100"
                     >
                        Login
                     </button>
                  </div>
               </form>

               <div className="text-center">
                  <p className="text-sm text-gray-500">
                     Don’t have an account?{" "}
                     <button
                        style={{
                           color: "#222163",
                           fontWeight: "500",
                        }}
                        onClick={handleSignUpClick}
                        className=" underline transition duration-300"
                     >
                        Sign Up
                     </button>
                  </p>
               </div>
            </div>
         </div>

         {/* ToastContainer to show notifications */}
         <ToastContainer />
      </div>
   );
};

export default LoginPage;
