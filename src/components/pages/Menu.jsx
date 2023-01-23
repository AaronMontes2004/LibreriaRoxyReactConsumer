import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import "../../assets/css/menu.css"
import logo from "../../assets/img/buho.png"
import arrow from "../../assets/icons/arrow.svg";
import product from "../../assets/icons/product.svg"
import sale from "../../assets/icons/sale.svg"
import buy from "../../assets/icons/buy.svg"
import category from "../../assets/icons/category.svg"
import location from  "../../assets/icons/location.svg"
import provider from "../../assets/icons/vendor.svg"
import user from "../../assets/icons/user.svg"
import ticket from "../../assets/icons/ticket.svg"
import userImg from "../../assets/img/user.png"
/* import "../../assets/js/main.js" */

const Menu = () => {

    const designNavbar = () => {
        let listElements = document.querySelectorAll('.list__button--click');
        listElements.forEach(listElement => {
            listElement.addEventListener('click', ()=>{
                
                
                let height = 0;
                let menu = listElement.nextElementSibling;
                if(menu.clientHeight == "0"){
                    height=menu.scrollHeight;   
                    menu.style.height = `${height}px`;
                    listElement.classList.add('arrowMenu');
                    return;
                }
                
                listElement.classList.remove('arrowMenu')
                /* listElement.children[2].classList.add("arrowMenu"); */
                menu.style.height = `${height}px`;
                return;
            })
        });
    }
    
    useEffect(() => {
        designNavbar();
    },[])

  return (
    <>
        <div className='navOptions'>
            <ul className='list'>
                <li className='navHeader'>
                    <div className="navHeader__container">
                        <img src={logo} alt="Imagen de buho" className='navHeader__img'/>
                        <Link to={"/"} className='navHeader__title'>Libreria Roxy</Link>
                    </div>
                </li>
                <li className='list__item list__item--click'>
                    <div className="list__button list__button--click">
                        <img src={product} alt="Producto" className="list__img" />
                        <a className='navOptions__link'>Producto</a>
                        <img src={arrow} alt="Flecha" className="list__arrow"/>
                    </div>
                    <ul className="list__show">
                        <li className="list__inside">
                            <Link to={"/registro-producto"} className="navOptions__link navOptions__link--inside">Registro Producto</Link>
                        </li>

                        <li className="list__inside">
                            <Link to={"/consulta-productos"} className="navOptions__link navOptions__link--inside">Consulta Productos</Link>
                        </li>
                    </ul>
                </li>
                <li className='list__item list__item--click'>
                    <div className="list__button list__button--click">
                        <img src={sale} alt="Producto" className="list__img" />
                        <a className='navOptions__link'>Venta</a>
                        <img src={arrow} alt="Flecha" className="list__arrow"/>
                    </div>
                    <ul className="list__show">
                        <li className="list__inside">
                            <Link to={"/registro-venta"} className="navOptions__link navOptions__link--inside">Registro Venta</Link>
                        </li>

                        <li className="list__inside">
                            <Link to={"/consulta-ventas"} className="navOptions__link navOptions__link--inside">Consulta Ventas</Link>
                        </li>
                    </ul>
                </li>
                <li className='list__item list__item--click'>
                    <div className="list__button list__button--click">
                        <img src={buy} alt="Venta" className="list__img" />
                        <a className='navOptions__link'>Compra</a>
                        <img src={arrow} alt="Flecha" className="list__arrow"/>
                    </div>
                    <ul className="list__show">
                        <li className="list__inside">
                            <Link to={"/registro-compra"} className="navOptions__link navOptions__link--inside">Registro Compra</Link>
                        </li>

                        <li className="list__inside">
                            <Link to={"/consulta-compras"} className="navOptions__link navOptions__link--inside">Consulta Compras</Link>
                        </li>
                    </ul>
                </li>
                <li className='list__item list__item--click'>
                    <div className="list__button list__button--click">
                        <img src={provider} alt="Producto" className="list__img" />
                        <a className='navOptions__link'>Proveedor</a>
                        <img src={arrow} alt="Flecha" className="list__arrow"/>
                    </div>
                    <ul className="list__show">
                        <li className="list__inside">
                            <Link to={"/registro-proveedor"} className="navOptions__link navOptions__link--inside">Registro Proveedor</Link>
                        </li>

                        <li className="list__inside">
                            <Link to={"/consulta-proveedores"} className="navOptions__link navOptions__link--inside">Consulta Proveedores</Link>
                        </li>
                    </ul>
                </li>
                <li className='list__item list__item--click'>
                    <div className="list__button list__button--click">
                        <img src={user} alt="Producto" className="list__img" />
                        <a className='navOptions__link'>Usuario</a>
                        <img src={arrow} alt="Flecha" className="list__arrow"/>
                    </div>
                    <ul className="list__show">
                        <li className="list__inside">
                            <a href="#" className="navOptions__link navOptions__link--inside">Registro Usuario</a>
                        </li>
                        <li className="list__inside">
                            <a href="#" className="navOptions__link navOptions__link--inside">Consulta Usuarios</a>
                        </li>
                    </ul>
                </li>
                
                <li className='list__item list__item--click'>
                    <div className="list__button"> {/* list__button--click */}
                        <img src={ticket} alt="Boleta" className="list__img" />
                        <Link to={"/boleta"} className='navOptions__link'>Boleta</Link>
                        {/* <img src="icons/arrow.svg" alt="Flecha" className="list__arrow"/> */}
                    </div>
                    {/* <ul className="list__show">
                        <li className="list__inside">
                            <a href="#" className="navOptions__link navOptions__link--inside">Consulta Boleta</a>
                        </li>
                    </ul> */}
                </li>

                <li className='list__item list__item--click'>
                    <div className="list__button">
                        <img src={category} alt="Categoria" className="list__img" />
                        <Link to={"/categoria"} className='navOptions__link'>Categoria</Link>
                    </div>
                </li>
                {/* <li className='list__item list__item--click'>
                    <div className="list__button"> 
                        <img src="icons/role.svg" alt="Producto" className="list__img" />
                        <a href="#" className='navOptions__link'>Rol</a>
                    </div>
                </li> */}

                <li className='list__item list__item--click'>
                    <div className="list__button"> 
                        <img src={location} alt="Producto" className="list__img" />
                        <Link to={"/ubicacion"} className='navOptions__link'>Ubicación</Link>
                    </div>
                </li>
            </ul>
        </div>
        <div className='navbar'>
            <nav className='navbar__header'>
                <div className='navbar__user'>
                    <a href="#" className='navbar__name'>Usuario</a>
                    <img src={userImg} alt="Usuario" className='navbar__img' />
                </div>
            </nav>
            <div className='containerPartials'>
                <Outlet/>
            </div>
        </div>
    </>
  )
}

export default Menu