"use client";

import { useLogin } from "@/hooks/useLogin";
import React, { useState } from "react";
import { FaFacebook, FaApple, FaGoogle, FaTwitter } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";
const LoginPage = () => {
  const {handleLogin: signIn, error, isLoading}= useLogin()
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [form,setForm]= useState({
    email: "",
    password: "",
  })  

  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

      signIn(form.email, form.password)
     
    
  };

  return (
    
    <section className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-xl w-full">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-start">
          Log in
        </h1>
        <form onSubmit={handleLogin} className="space-y-6">
    
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-gray-600 mb-1">
              Email address or user name
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              value={form.email}
              onChange={(e)=> setForm({...form, email: e.target.value})}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                className="px-4 py-2 border rounded-md text-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                value={form.password}
              onChange={(e)=> setForm({...form, password: e.target.value})}
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                onClick={() => setPasswordVisible((prev) => !prev)}
              >
                {passwordVisible ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="remember-me"
              className="h-4 w-4 rounded border-gray-300 focus:ring-blue-400"
            />
            <label htmlFor="remember-me" className="text-sm text-gray-600">
              Remember me
            </label>
          </div>

       
          <p className="text-xs text-gray-500 text-center">
            By continuing, you agree to the{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Terms of use
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Privacy Policy
            </a>.
          </p>
          <button
          disabled={isLoading}
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 transition duration-300"
          >
            Log in
          </button>

          { error &&  <p className=" text-red-500 text-sm font-medium">{error}</p>}
        </form>

  
        <div className="text-center mt-4">
          <a href="#" className="text-sm text-blue-500 hover:underline">
            Forgot your password?
          </a>
          <p className="text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link href="/auth/signup" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>

        <div className="flex items-center my-6">
          <div className="border-t w-full border-gray-300"></div>
          <span className="px-4 text-sm text-gray-600">Or continue with</span>
          <div className="border-t w-full border-gray-300"></div>
        </div>

     
        <div className="flex justify-center space-x-4">
          <button className="p-2 border rounded-md hover:bg-gray-100 transition duration-300">
            <FaFacebook className="text-blue-600" size={20} />
          </button>
          <button className="p-2 border rounded-md hover:bg-gray-100 transition duration-300">
            <FaApple className="text-black" size={20} />
          </button>
          <button className="p-2 border rounded-md hover:bg-gray-100 transition duration-300">
            <FaGoogle className="text-red-500" size={20} />
          </button>
          <button className="p-2 border rounded-md hover:bg-gray-100 transition duration-300">
            <FaTwitter className="text-blue-400" size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
