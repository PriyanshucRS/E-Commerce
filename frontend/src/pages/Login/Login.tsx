import { useDispatch,useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginRequest } from "../../redux/Slices/authSlice";
import {type  RootState } from "../../redux/store/store";
import { useState, useEffect } from "react";

export const Login = () => {

   const [formData , setFormData] = useState({
    email : "",
    password :""
  })
   const { user } = useSelector((state: RootState) => state.auth);

   const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        if(user){
           navigate("/");   
        }
    },[user,navigate]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
    setFormData({
      ...formData , 
      [e.target.id] : e.target.value
    })
  }

  const handleSubmit = (e : React.FormEvent)=>{
         e.preventDefault();
        dispatch(loginRequest(formData))
        
        setFormData({
        email: "",
        password: "",
    });
         
  }

  return (
     <div className="h-screen overflow-y-auto flex items-center justify-center bg-gray-500 px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-red-500 font-bold text-center">Login Page</h1>
        
    <form className="space-y-6" onSubmit={handleSubmit} >
      
      <div>
        <div>
          <label 
          htmlFor="email"
        className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input 
          id="email" 
          type="email"
        value={formData.email}

          placeholder = "Enter your mail"
          className="w-full px-4 py-3 border
           border-gray-300 rounded-lg focus:ring-2
            focus:ring-blue-500 focus:border-transparent outline-none transition"
           required
           onChange={handleChange}
           />
        </div>
        <div>
          <label 
          htmlFor="passwprd"
         className="block text-sm font-medium text-gray-700 mb-1"
          >Password</label>
          <input 
          id="password"
          type="password"
         value={formData.password}

          placeholder = "Enter your password"
          className="w-full px-4 py-3 border
           border-gray-300 rounded-lg focus:ring-2
            focus:ring-blue-500 focus:border-transparent outline-none transition"
          required 
          onChange={handleChange}
          />
        </div>
      </div>
      <p>
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold
         hover:bg-blue-700 transition-all shadow-md">Login</button>
      </p>
    </form>
    <p className="text-center text-gray-600 mt-8">
        Don't have an account?{' '} 
        <Link to="/register" className="text-blue-600 font-bold hover:underline"> Register</Link><br />
       
         <Link to="/" className="text-blue-600 font-bold hover:underline">Home</Link>
      
    </p>
   
   </div>

    </div>
  );
};
