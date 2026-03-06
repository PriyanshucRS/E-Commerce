E-Commerce website

Implement features:
 - CRUD on products
 - auth
 - wislist
 - cart (2x, 3x)
 - Price calculation
 - Handle error and success

Navigation with React Router Dom
Glabal State Management with Redux Toolkit
API call with Redux-Saga
Form (React Hook Form)

Component → Action → Saga → API → Saga → Reducer → UI Update

# 🛒 Full Stack E-Commerce Project Guide

### (Vite + React + TypeScript + Tailwind + Node + Express + MongoDB)

---

# 📌 1. Project Overview

## 🎯 Goal

Build a Full Stack E-commerce Application with:

* User Authentication (Register/Login)
* Product CRUD
* Cart (Quantity update 2x, 3x etc.)
* Wishlist
* Price Calculation
* Proper Error & Success Handling
* Admin Control (optional)

---


Development Order (Exact Sequence)
     1️⃣ server.js
2️⃣ app.js
3️⃣ db.js
4️⃣ User model
5️⃣ Auth routes + controller
6️⃣ Auth middleware
7️⃣ Product model
8️⃣ Product routes + controller
9️⃣ Cart model
🔟 Cart routes + controller
11️⃣ Wishlist model
12️⃣ Error middleware

# 🧠 2. Development Order (Follow This Always)
     Server → Database → Basic Structure → Auth → Products → Cart → Wishlist → Error Handling

1. Planning
2. Database Design
3. Backend Setup
4. Authentication System
5. Product CRUD
6. Cart Logic
7. Wishlist
8. Global Error Handling
9. Frontend Setup
10. API Integration
11. Testing & Deployment

---

# 🗄 3. Database Design

## 🟢 User Collection

* _id
* name
* email
* password (hashed)
* role (user/admin)
* createdAt

---

## 🟢 Product Collection

* _id
* title
* description
* price
* stock
* images
* category
* createdAt

---

## 🟢 Cart Collection

* userId
* products:

  * productId
  * quantity
* updatedAt

---

## 🟢 Wishlist Collection

* userId
* productIds []

---

# ⚙ 4. Backend Setup

## Step 1: Create Backend Folder

mkdir backend
cd backend
npm init -y

---

## Step 2: Install Dependencies

npm install express mongoose dotenv cors bcryptjs jsonwebtoken
npm install --save-dev nodemon

---

# 📁 Backend Folder Structure

backend/

controllers/
 auth.controller.js
 product.controller.js
 cart.controller.js
 wishlist.controller.js

models/
 User.js,Product.js,Cart.js,Wishlist.js,

routes/

middleware/
 auth.middleware.js,error.middleware.js       
                                       
config/
utils/
.env
server.js

---

# 🔐 5. Authentication Flow

1. User registers
2. Password hashed using bcrypt
3. JWT token generated on login
4. Token sent to frontend
5. Frontend stores token
6. Token sent in Authorization header

---

# 📦 6. Product APIs

GET /products
GET /products/:id
POST /products (admin)
PUT /products/:id (admin)
DELETE /products/:id (admin)

---

# 🛒 7. Cart Features

* Add to cart
* Increase quantity (2x, 3x)
* Remove item
* Calculate subtotal

### Backend Must:

* Check stock
* Validate product exists
* Recalculate total
* Save updated cart

---

# ❤️ 8. Wishlist Features

* Add product
* Remove product
* Get wishlist items

---

# 🛡 9. Error Handling

## Backend

* Try-catch in controllers
* Global error middleware
* Custom error responses

## Frontend

* Loading spinner
* Success toast
* Error alert messages

---

# 🎨 10. Frontend Setup

## Step 1: Create Project

npm create vite@latest frontend
cd frontend
npm install

Select:

* React
* TypeScript

---

## Step 2: Install Tailwind

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

Configure tailwind.config.js and index.css

---

## Step 3: Install Required Packages

npm install axios react-router-dom
npm install @reduxjs/toolkit react-redux

---

# 📁 Frontend Folder Structure

src/

app/
 store.ts

features/
 auth,products,cart,wishlist

pages/
 Home,ProductDetails,Cart,Login,Register

components/
 Navbar,ProductCard,Button

services/
hooks/
types/
utils/
layouts/

---

# 💰 11. Price Calculation Logic

Frontend:
subtotal = price × quantity

Backend:

* Validate stock
* Validate price
* Apply discount (if needed)
* Return final total

⚠ Always trust backend price, not frontend.

---

# 🔄 12. API Flow

User → Login
Frontend → Store Token
Frontend → Call Protected API
Backend → Validate Token
Backend → Return Data
Frontend → Update UI

---

# 🚀 13. Deployment (Future)

Frontend → Vercel / Netlify
Backend → Render / Railway
Database → MongoDB Atlas

---

# 🧠 Professional Mindset

Always:

* Plan first
* Design database
* Build backend first
* Then frontend
* Validate everything in backend
* Keep clean folder structure
* Handle errors properly

---

# ✅ Final Project Flow

User Registers
User Logs In
User Browses Products
User Adds to Cart
Backend Validates & Calculates
Frontend Shows Updated UI

---

END OF DOCUMENT
