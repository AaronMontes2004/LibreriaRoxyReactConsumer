import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CategoryState from './components/contexts/category/CategoryState'
import LocationState from './components/contexts/location/LocationState'
import ProductState from './components/contexts/product/ProductState'
import ProviderState from './components/contexts/provider/ProviderState'
import PurchaseState from './components/contexts/purchase/PurchaseState'
import SaleState from './components/contexts/sale/SaleState'
import TicketState from './components/contexts/ticket/TicketState'
import UserState from './components/contexts/user/UserState'
import MenuCategory from './components/pages/category/MenuCategory'
import ConfigMenu from './components/pages/ConfigMenu'
import MenuLocation from './components/pages/location/MenuLocation'
import Menu from './components/pages/Menu'
import AddProduct from './components/pages/product/AddProduct'
import GetProduct from './components/pages/product/GetProduct'
import AddProvider from './components/pages/provider/AddProvider'
import GetProvider from './components/pages/provider/GetProvider'
import AddPurchase from './components/pages/purchase/AddPurchase'
import GetPurchase from './components/pages/purchase/GetPurchase'
import GetPurchaseDetailByIdPurchase from './components/pages/purchase/GetPurchaseDetailByIdPurchase'
import AddSale from './components/pages/sale/AddSale'
import GetSale from './components/pages/sale/GetSale'
import GetSaleDetailByIdSale from './components/pages/sale/GetSaleDetailByIdSale'
import GetTicket from './components/pages/ticket/GetTicket'
import Login from './components/pages/users/Login'
import Signin from './components/pages/users/Signin'
import VerifiedLogin from './components/pages/validation/VerifiedLogin'
import Welcome from './components/pages/Welcome'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<UserState/>}>
            <Route index path='/iniciar-sesion' element={<Login/>}/>
          </Route>
          <Route element={<VerifiedLogin/>} >
            <Route element={<ConfigMenu/>}>
              <Route element={<Menu/>}>
                <Route path='/' element={<Welcome/>}/>
                <Route element={<UserState/>}>
                  <Route path='/registrarse' element={<Signin/>}/>
                </Route>
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
                  <Route path='/consulta-ventas/:idVenta' element={<GetSaleDetailByIdSale/>} />
                </Route>
                <Route element={<TicketState/>}>
                  <Route path='/boleta' element={<GetTicket/>} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
