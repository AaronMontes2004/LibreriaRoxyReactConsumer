import React, { createContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import { request } from '../../libs/urlConsumer';
import MessageModal from '../../modal/MessageModal';

export const PurchaseContext = createContext();

const PurchaseState = (props) => {

    const [datePurchase, setDatePurchase] = useState("");

    const [pageStatus, setPageStatus] = useState(true);

    const [searchText, setSearchText] = useState("");
    const [productsPurchase, setProductsPurchase] = useState([]);
    const [listProductsPurchaseAdd, setListProductsPurchaseAdd] = useState([]);
    const [listProvidersPurchase, setListProvidersPurchase] = useState([]);
    const [precioTotal, setPrecioTotal] = useState(0);
    const [dateProviderJSON, setDateProviderJSON] = useState({
        idProveedor: "vacio",
        fechaCompra: new Date().toLocaleString()
    });
    const [activeModal, setActiveModal] = useState(false);
    const [status, setStatus] = useState("");
    const [message, setMessage] = useState("");

    const [purchases, setPurchases] = useState([]);
    
    const [editPurchase, setEditPurchase] = useState({
        fechaCompra: "",
        totalPagar: 0,
        idProveedor: "vacio"
    });
    /* const [statusEditPurchase, setStatusEditPurchase] = useState(false); */
  
    /* const [listProductsId, setListProductsId] = useState([1,2]); */
    const functionAddedProductPurchase = (product) => {
        let verified = true;
        for (let index = 0; index < listProductsPurchaseAdd.length; index++) {
            if (listProductsPurchaseAdd[index].idProducto === product.idProducto){
                verified = false;
                console.log("El producto ya está en la compra");
                break;
            }
        }

        if (verified === true){
            product.cantidadTotalIndividual = 1;
            product.precioTotalIndividual = product.precioCProducto;
            listProductsPurchaseAdd.push(product);
            setListProductsPurchaseAdd([...listProductsPurchaseAdd])
        }

        let suma = 0

        listProductsPurchaseAdd.map(p => {
            suma = suma + parseFloat(p.precioTotalIndividual);
        })
        setPrecioTotal(suma.toFixed(2));
    }

    const functionDeleteProductPurchase = (id) => {
        let newList = listProductsPurchaseAdd.filter(x => {
            return x.idProducto != id
        });
        
        let suma = 0

        newList.map(p => {
            suma = suma + parseFloat(p.precioTotalIndividual);
        })
        setPrecioTotal(suma.toFixed(2));

        setListProductsPurchaseAdd([...newList])

    }

    const handleChangePrice = (value, idProducto) => {
        listProductsPurchaseAdd.map(p => {
            if (p.idProducto === idProducto){
                if (value === "" || value === 0 || value === null || value === undefined){
                    p.cantidadTotalIndividual = value;
                    p.precioTotalIndividual = (1 * p.precioCProducto).toFixed(2);
                    setListProductsPurchaseAdd([...listProductsPurchaseAdd])
                } else{
                    p.cantidadTotalIndividual = value;
                    p.precioTotalIndividual = (value * p.precioCProducto).toFixed(2);
                    setListProductsPurchaseAdd([...listProductsPurchaseAdd])
                }
            }
        })
        let suma = 0

        listProductsPurchaseAdd.map(p => {
            suma = suma + parseFloat(p.precioTotalIndividual);
        })
        setPrecioTotal(suma.toFixed(2));
        console.log(listProductsPurchaseAdd);
    }

    const functionAddPurchase = async () => {

        if (dateProviderJSON.idProveedor === "vacio"){
            setActiveModal(true)
            setStatus("FAILED");
            setMessage("Debe seleccionar un proveedor");
            setTimeout(()=>{
                setActiveModal(false)
            }, 1700)
            return;
        }
        
        if (listProductsPurchaseAdd.length === 0){
            setActiveModal(true)
            setStatus("FAILED");
            setMessage("Debe seleccionar al menos un producto");
            setTimeout(()=>{
                setActiveModal(false)
            }, 1700)
            return;
        }

        let verified = 0;

        listProductsPurchaseAdd.map(p => {
            if (p.cantidadTotalIndividual === null || p.cantidadTotalIndividual === "" || p.cantidadTotalIndividual === undefined){
                verified = 1;
                return;
            } 

            if (p.cantidadTotalIndividual < 1){
                verified = 2;
                return;
            }
        })

        if (verified === 1){
            setActiveModal(true)
            setStatus("FAILED");
            setMessage("La cantidad de la compra no puede estar vacio");
            setTimeout(()=>{
                setActiveModal(false)
            }, 1700)
            return;
        } else if (verified === 2){
            setActiveModal(true)
            setStatus("FAILED");
            setMessage("La cantidad de la compra no debe ser menor a 1");
            setTimeout(()=>{
                setActiveModal(false)
            }, 1700)
            return;

        }

        if (precioTotal === null || precioTotal === ""){
            setActiveModal(true)
            setStatus("FAILED");
            setMessage("El precio total no puede estar vacio");
            setTimeout(()=>{
                setActiveModal(false)
            }, 1700)
            return;           
        }

        const purchase = await request.post("purchase", {
            fechaCompra: dateProviderJSON.fechaCompra,
            totalPagar: precioTotal,
            idProveedor: dateProviderJSON.idProveedor
        });
        for (let index = 0; index < listProductsPurchaseAdd.length; index++) {

            const purchaseAdded = await request.post("purchase-detail", {
                cantidadCompra: listProductsPurchaseAdd[index].cantidadTotalIndividual,
                precioUnitarioCompra: listProductsPurchaseAdd[index].precioCProducto,
                totalCompra: listProductsPurchaseAdd[index].precioTotalIndividual,
                idCompra: purchase.data.data.insertId,
                idProducto: listProductsPurchaseAdd[index].idProducto
            })

            setListProductsPurchaseAdd([]);
            setPrecioTotal(0.00);
            setPageStatus(!pageStatus)
            
            console.log(purchaseAdded.data);
        }

        setActiveModal(true)
        setStatus("OK");
        setMessage("La compra se registró exitosamente");
        setTimeout(()=>{
            setActiveModal(false)
        }, 1700)
        return;

        console.log(purchase.data.data);
    }

    useEffect(() => {
        const listProductsPurchase = async () => {
            if (searchText === null || searchText === "" || searchText === undefined){
                const products = await request.get("product/enabled");
                setProductsPurchase(products.data.data)
                return;
            } else {
                const products = await request.get("product/findByName/enabled/"+searchText)
                setProductsPurchase(products.data.data);
                return;
            }
        }

        listProductsPurchase();
    }, [searchText])

    useEffect(() => {
        const listProviders = async () => {
            const providers = await request.get("provider/enabled");
            setListProvidersPurchase(providers.data.data);
        }
        listProviders();
        var fecha = new Date(); //Fecha actual
        var mes = fecha.getMonth()+1; //obteniendo mes
        var dia = fecha.getDate(); //obteniendo dia
        var ano = fecha.getFullYear(); //obteniendo año
        if(dia<10)
        dia='0'+dia; //agrega cero si el menor de 10
        if(mes<10)
        mes='0'+mes

        const dateLocal = ano + "-" + mes + "-" + dia;

        setDateProviderJSON({...dateProviderJSON, ["fechaCompra"]: dateLocal})
        },[])

    useEffect(() => {
        const getPurchase = async() => {
            const listPurchases = await request.get("purchase");
            setPurchases(listPurchases.data.data);
        }
        getPurchase();
    }, [pageStatus])

  return (
    <PurchaseContext.Provider value={{
        setSearchText: setSearchText,
        productsPurchase: productsPurchase,
        setListProductsPurchaseAdd: setListProductsPurchaseAdd,
        listProductsPurchaseAdd: listProductsPurchaseAdd,
        listProvidersPurchase: listProvidersPurchase,
        functionAddedProductPurchase: functionAddedProductPurchase,
        functionDeleteProductPurchase: functionDeleteProductPurchase,
        handleChangePrice: handleChangePrice,
        precioTotal: precioTotal,
        setPrecioTotal: setPrecioTotal,
        dateProviderJSON: dateProviderJSON,
        setDateProviderJSON: setDateProviderJSON,
        functionAddPurchase: functionAddPurchase,
        purchases: purchases,
        setPurchases: setPurchases,
        editPurchase: editPurchase,
        setEditPurchase: setEditPurchase,
/*         statusEditPurchase: statusEditPurchase,
        setStatusEditPurchase: setStatusEditPurchase */
        pageStatus: pageStatus,
        setPageStatus: setPageStatus,
        datePurchase: datePurchase,
        setDatePurchase: setDatePurchase
    }}>
        {props.children}
        <Outlet/>
        <MessageModal activeModal={activeModal} message={message} status={status} />
    </PurchaseContext.Provider>
  )
}

export default PurchaseState