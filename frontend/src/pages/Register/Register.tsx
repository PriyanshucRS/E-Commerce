import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {  regitsterRequest } from "../../redux/Slices/authSlice";
import { useState } from "react";

export const Register = () => {
  const dispatch = useDispatch();

  const [formData , setFormData] = useState({
     firstName : "",
     lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>)=> {
    setFormData({
      ...formData ,
      [e.target.id] : e.target.value
    })
     
  }

  const handleSubmit = (e :React.FormEvent)=>{

      e.preventDefault();
       dispatch(regitsterRequest(formData))
       setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
  }


  return (
    <div className="h-screen overflow-y-auto flex items-center justify-center bg-gray-500 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6">

        <h1 className="text-red-500 font-bold text-center text-xl">Registration Page</h1>

        <form className="space-y-4" onSubmit={handleSubmit} >

          <div className="space-y-3">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                id="firstName"
                type="text"
                value={formData.firstName}
                placeholder="Enter your first name"
                className="w-full px-4 py-2 border
           border-gray-300 rounded-lg focus:ring-2
            focus:ring-blue-500 focus:border-transparent outline-none transition"
                required 
                onChange={handleChange}
                />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                id="lastName"
                type="text"
                value={formData.lastName}
                placeholder="Enter your last name"
                className="w-full px-4 py-2 border
           border-gray-300 rounded-lg focus:ring-2
            focus:ring-blue-500 focus:border-transparent outline-none transition"
                required 
                onChange={handleChange}
                 />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                id="email"
                type="email"
                value={formData.email}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border
           border-gray-300 rounded-lg focus:ring-2
            focus:ring-blue-500 focus:border-transparent outline-none transition"
                required 
                onChange={handleChange}
                 />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >Password</label>
              <input
                id="password"
                type="password"
                value={formData.password}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border
           border-gray-300 rounded-lg focus:ring-2
            focus:ring-blue-500 focus:border-transparent outline-none transition"
                required
                onChange={handleChange}
                />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                placeholder="Enter your confirm password"
                className="w-full px-4 py-2 border
           border-gray-300 rounded-lg focus:ring-2
            focus:ring-blue-500 focus:border-transparent outline-none transition"
                required 
                onChange={handleChange}
                />
            </div>
          </div>
          <div>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold
         hover:bg-blue-700 transition-all shadow-md">Register</button>
          </div>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{' '}

          <Link to="/login" className="text-blue-600 font-bold hover:underline">Login</Link><br />
          
            <Link to="/" className="text-blue-600 font-bold hover:underline text-sm">Home</Link>
         

        </p>

      </div>

    </div>
  )
}
