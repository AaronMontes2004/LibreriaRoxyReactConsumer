import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import "../../assets/css/menu.css"
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
                        <img src="img/buho.png" alt="Imagen de buho" className='navHeader__img'/>
                        <a href="#" className='navHeader__title'>Libreria Roxy</a>
                    </div>
                </li>
                <li className='list__item list__item--click'>
                    <div className="list__button list__button--click">
                        <img src="icons/product.svg" alt="Producto" className="list__img" />
                        <a className='navOptions__link'>Producto</a>
                        <img src="icons/arrow.svg" alt="Flecha" className="list__arrow"/>
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
                        <img src="icons/sale.svg" alt="Producto" className="list__img" />
                        <a className='navOptions__link'>Venta</a>
                        <img src="icons/arrow.svg" alt="Flecha" className="list__arrow"/>
                    </div>
                    <ul className="list__show">
                        <li className="list__inside">
                            <a href="#" className="navOptions__link navOptions__link--inside">Registro Venta</a>
                        </li>

                        <li className="list__inside">
                            <a href="#" className="navOptions__link navOptions__link--inside">Consulta Ventas</a>
                        </li>
                    </ul>
                </li>
                <li className='list__item list__item--click'>
                    <div className="list__button list__button--click">
                        <img src="icons/buy.svg" alt="Producto" className="list__img" />
                        <a className='navOptions__link'>Compra</a>
                        <img src="icons/arrow.svg" alt="Flecha" className="list__arrow"/>
                    </div>
                    <ul className="list__show">
                        <li className="list__inside">
                            <a href="#" className="navOptions__link navOptions__link--inside">Registro Compra</a>
                        </li>

                        <li className="list__inside">
                            <a href="#" className="navOptions__link navOptions__link--inside">Consulta Compras</a>
                        </li>
                    </ul>
                </li>
                <li className='list__item list__item--click'>
                    <div className="list__button list__button--click">
                        <img src="icons/vendor.svg" alt="Producto" className="list__img" />
                        <a className='navOptions__link'>Proveedor</a>
                        <img src="icons/arrow.svg" alt="Flecha" className="list__arrow"/>
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
                        <img src="icons/user.svg" alt="Producto" className="list__img" />
                        <a className='navOptions__link'>Usuario</a>
                        <img src="icons/arrow.svg" alt="Flecha" className="list__arrow"/>
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
                    <div className="list__button">
                        <img src="icons/category.svg" alt="Categoria" className="list__img" />
                        <Link to={"/categoria"} className='navOptions__link'>Categoria</Link>
                    </div>
                </li>
                <li className='list__item list__item--click'>
                    <div className="list__button"> {/* list__button--click */}
                        <img src="icons/ticket.svg" alt="Boleta" className="list__img" />
                        <a href="#" className='navOptions__link'>Boleta</a>
                        {/* <img src="icons/arrow.svg" alt="Flecha" className="list__arrow"/> */}
                    </div>
                    {/* <ul className="list__show">
                        <li className="list__inside">
                            <a href="#" className="navOptions__link navOptions__link--inside">Consulta Boleta</a>
                        </li>
                    </ul> */}
                </li>
                {/* <li className='list__item list__item--click'>
                    <div className="list__button"> 
                        <img src="icons/role.svg" alt="Producto" className="list__img" />
                        <a href="#" className='navOptions__link'>Rol</a>
                    </div>
                </li> */}

                <li className='list__item list__item--click'>
                    <div className="list__button"> 
                        <img src="icons/location.svg" alt="Producto" className="list__img" />
                        <Link to={"/ubicacion"} className='navOptions__link'>Ubicación</Link>
                    </div>
                </li>
            </ul>
        </div>
        <div className='navbar'>
            <nav className='navbar__header'>
                <div className='navbar__user'>
                    <a href="#" className='navbar__name'>Usuario</a>
                    <img src="img/user.png" alt="Usuario" className='navbar__img' />
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