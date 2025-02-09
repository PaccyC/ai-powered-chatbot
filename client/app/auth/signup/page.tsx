"use client";

import { useSignUp } from '@/hooks/useSignUp';
import Link from 'next/link';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {handleSignup: register,error,isLoading}= useSignUp();
  const [ form, setForm]= useState( {
    name: '',
    email: '',
    password: ''
  })
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    register(form.name, form.email, form.password);

  };

  return (
    <section className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-xl w-full">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-start">
          Register
        </h1>
        <form onSubmit={handleSignup} className="space-y-6">
    

        <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-gray-600 mb-1">
              Full Names
            </label>
            <input
              type="text"
              id="names"
              name='name'
              placeholder="Enter your names..."
              className="px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              value={form.name}
              onChange={(e)=> setForm({...form, name: e.target.value})}
            />
            
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-gray-600 mb-1">
              Email address or user name
            </label>
            <input
              type="email"
              id="email"
              name='email'
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
                name='password'
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
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 transition duration-300"
          >
            Sign up
          </button>
        </form>

        {/* Forgot Password and Sign Up */}
        <div className="text-center mt-4">
      
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-500 hover:underline">
              Sign in
            </Link>
          </p>
        </div>

    

     
      </div>
    </section>
  )
}

export default RegisterPage