import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import ProtectedRoute from './components/ProtectedRoute';
import Signup from "./pages/Signup";

// Admin
import Dashboard from './admin/Dashboard';
import ShopsAdmin from './admin/ShopsAdmin';
import CategoriesAdmin from './admin/CategoriesAdmin';
import ProductsAdmin from './admin/ProductsAdmin';
import OrdersAdmin from './admin/OrdersAdmin';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/login" element={<Login />} />

      {/* Admin */}
      <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/admin/shops" element={<ProtectedRoute><ShopsAdmin /></ProtectedRoute>} />
      <Route path="/admin/categories" element={<ProtectedRoute><CategoriesAdmin /></ProtectedRoute>} />
      <Route path="/admin/products" element={<ProtectedRoute><ProductsAdmin /></ProtectedRoute>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/admin/orders" element={<ProtectedRoute><OrdersAdmin /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
