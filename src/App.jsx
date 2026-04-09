import { useState } from 'react';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Blog from './pages/Blog';

export default function App() {
  const [page, setPage] = useState('home');
  window.__navigate = setPage;

  const navigate = setPage;

  const routes = {
    home:    <Home />,
    shop:    <Shop />,
    product: <ProductDetail onNavigate={navigate} />,
    contact: <Contact />,
    cart:    <Cart onNavigate={navigate} initialView="cart" />,
    checkout:<Cart onNavigate={navigate} initialView="checkout" />,
    blog:    <Blog onNavigate={navigate} />,
  };

  return routes[page] || <Home />;
}
