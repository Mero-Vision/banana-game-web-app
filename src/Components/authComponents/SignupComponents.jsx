import axios from "../../utils/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loginImg from "../../assets/loginbg.jpg";

const SignupPage = () => {
   const navigate = useNavigate();
   const [userData, setUserData] = useState({
      username: "",
      email: "",
      password: "",
   });

   const [errors, setErrors] = useState({});

   // Handle form input changes
   const handleChange = (e) => {
      const { name, value } = e.target;
      setUserData({
         ...userData,
         [name]: value,
      });
   };

   // Form validation
   const validate = () => {
      const validationErrors = {};
      if (!userData.username)
         validationErrors.username = "Username is required";
      if (!userData.email)
         validationErrors.email = "Email is required";
      if (!userData.password)
         validationErrors.password = "Password is required";

      return validationErrors;
   };

   // Handle login navigation
   const handleLoginClick = () => {
      navigate("/");
   };

   // Handle form submission
   const handleSubmit = async (e) => {
      e.preventDefault();
      const validationErrors = validate();
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length === 0) {
         try {
            const response = await axios.post(
               "user/",
               {
                  username: userData.username,
                  email: userData.email,
                  password: userData.password,
               }
            );
            console.log(response);
            toast.success("Registration successful");

            // Navigate to login page after successful registration
            setTimeout(() => {
               navigate("/");
            }, 2000);
         } catch (error) {
            console.error(error.message);
            toast.error("Registration failed");
         }
      }
   };

   return (
      <div
         style={{
            display: "grid",
            width: "100%",
            gridTemplateColumns: "1fr 1fr",
         }}
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
                  {" "}
                  Create Account
               </h2>
               <p
                  style={{ marginBottom: "20px" }}
                  className="text-center text-gray-600"
               >
                  Sign up to get started!
               </p>
               <ToastContainer />
               <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="relative">
                     <input
                        type="text"
                        name="username"
                        value={userData.username}
                        onChange={handleChange}
                        placeholder="Username"
                        className="mb-1 w-full px-4 py-3 text-gray-800 placeholder-gray-400 bg-purple-50 rounded-lg border border-purple-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                     />
                     {errors.username && (
                        <p className="text-red-500 text-sm">
                           {errors.username}
                        </p>
                     )}
                  </div>

                  <div className="relative">
                     <input
                        type="email"
                        name="email"
                        value={userData.email}
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
                        value={userData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="mb-1 w-full px-4 py-3 text-gray-800 placeholder-gray-400 bg-purple-50 rounded-lg border border-purple-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
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
                        Sign Up
                     </button>
                  </div>
               </form>

               <div className="text-center">
                  <p className="text-sm text-gray-600">
                     Already have an account?{" "}
                     <button
                        style={{
                           color: "#222163",
                           fontWeight: "500",
                        }}
                        onClick={handleLoginClick}
                        className=" underline transition duration-300"
                     >
                        Log In
                     </button>
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default SignupPage;
