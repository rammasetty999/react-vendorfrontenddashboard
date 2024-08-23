import './App.css';
import {NextUIProvider} from "@nextui-org/system";
import N from './components/N';
import {BrowserRouter,Route,Routes,Link,useLocation} from 'react-router-dom'
import Landingpage from './components/Landingpage';
import Vend from './components/Vend';
import Addproduct from './components/Addproduct';
import AddFirm from './components/AddFirm';
import Home from './components/Home';
import Getproducts from './components/Getproducts';
import PrivateRoute from './components/PrivateRoute';
import Nopage from './components/Nopage';
function App() {
  const location = useLocation();
  const hideNavbarRoutes = ['/success', '/addproduct','/addfirm','/home','/getproducts'];

  return (
    <NextUIProvider>
    
      {!hideNavbarRoutes.includes(location.pathname) && <N />}
      {location.pathname.includes('/addfirm') && <Vend />}
      {location.pathname.includes('/addproduct') && <Vend />}
      {location.pathname.includes('/home') && <Vend />}
      {location.pathname.includes('/success') && <Vend />}
      
    
      {location.pathname.includes('/getproducts') && <Vend />}

      <Routes>
        <Route path='/' element={<Landingpage />} />
        
        <Route path='/logout' element={<Landingpage />} />
        <Route element={<PrivateRoute />}>
        <Route path='/home' element={<Home />} />
      
        </Route>
        <Route element={<PrivateRoute />}>
        <Route path='/getproducts' element={<Getproducts/>} />
      
        </Route>
        <Route element={<PrivateRoute />}>
        <Route path='/getproducts' element={<Getproducts/>} />
        </Route>
      <Route element={<PrivateRoute />}>
      <Route path='/addproduct' element={<Addproduct/>}/>
      </Route>
        <Route element={<PrivateRoute />}>
        <Route path='/addproduct' element={<Addproduct/>}/>
        <Route path='/addfirm' element={<AddFirm/>}/>
        </Route>
        <Route element={<PrivateRoute />}>
        <Route path='/success' element={<Home/>} />
        </Route>
        <Route path='/*' element={<Nopage/>}/>
      
        
      </Routes>
    </NextUIProvider>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
