import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import CategoryState from './components/contexts/category/CategoryState'
import LocationState, { LocationContext } from './components/contexts/location/LocationState'
import ProductState from './components/contexts/product/ProductState'
import ProviderState from './components/contexts/provider/ProviderState'
import PurchaseState from './components/contexts/purchase/PurchaseState'
import SaleState from './components/contexts/sale/SaleState'
import UserState from './components/contexts/user/UserState'
import Category from './components/pages/category/Category'
import GetCategory from './components/pages/category/GetCategory'
import MenuCategory from './components/pages/category/MenuCategory'
import Config from './components/pages/config'
import MenuLocation from './components/pages/location/MenuLocation'
import Menu from './components/pages/menu'
import AddProduct from './components/pages/product/AddProduct'
import GetProduct from './components/pages/product/GetProduct'
import AddProvider from './components/pages/provider/AddProvider'
import GetProvider from './components/pages/provider/GetProvider'
import AddPurchase from './components/pages/purchase/AddPurchase'
import GetPurchase from './components/pages/purchase/GetPurchase'
import GetPurchaseDetailByIdPurchase from './components/pages/purchase/GetPurchaseDetailByIdPurchase'
import AddSale from './components/pages/sale/AddSale'
import GetSale from './components/pages/sale/GetSale'
import Login from './components/pages/users/Login'
import Signin from './components/pages/users/Signin'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<UserState/>}>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signin' element={<Signin/>}/>
          </Route>
          <Route element={<Config/>}>
            <Route element={<Menu/>}>
              <Route path='/' element={<h1>Bienvenido</h1>} />
              <Route element={<CategoryState/>}>
                <Route path='/categoria' element={<MenuCategory/>}/>
              </Route>
              <Route element={<ProductState/>}>
                <Route path='/registro-producto' element={<AddProduct/>}/>
                <Route path='/consulta-productos' element={<GetProduct/>}/>
              </Route>
              <Route element={<LocationState/>}>
                <Route path='/ubicacion' element={<MenuLocation/>} />
              </Route>
              <Route element={<ProviderState/>}>
                <Route path='/registro-proveedor' element={<AddProvider/>} />
                <Route path='/consulta-proveedores' element={<GetProvider/>} />
              </Route>
              <Route element={<PurchaseState/>}>
                <Route path='/registro-compra' element={<AddPurchase/>}/>
                <Route path='/consulta-compras' element={<GetPurchase/>}/>
                <Route path='/consulta-compras/:idCompra' element={<GetPurchaseDetailByIdPurchase/>} />
              </Route>
              <Route element={<SaleState/>}>
                <Route path='/registro-venta' element={<AddSale/>} />
                <Route path='/consulta-ventas' element={<GetSale/>} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
