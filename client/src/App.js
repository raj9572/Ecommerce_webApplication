import './App.css';
import {Routes,Route} from 'react-router-dom'
import Home from './pages/home/Home';
import Navbar from './components/navbar/Navbar';
import Categories from './pages/categories/Categories';
import ProductDetail from './pages/productDetail/ProductDetail';
import Footer from './components/footer/Footer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCategories } from './redux/categorySlice';
import Payments from './components/Payment/Payments';

function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchCategories())
  },[])
  return (
    <div >
      <Navbar/>
     <Routes>
       <Route element={<Home/>} path="/"></Route>
       <Route element={<Categories/>} path="/category/:categoryId?"></Route>
       <Route element={<ProductDetail/>} path="/products/:productId"></Route>
       <Route element={<Payments/>} path="/payments/:status"></Route>
     </Routes>
     <Footer/>
    </div>
  );
}

export default App;
