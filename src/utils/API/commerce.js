
import { encriptarJson, desencriptarJson } from "../security";
import {ENTRYPOINT} from '../../config/API'
const axios = require("axios");

export const obtenerTodos = (filtros,setData, store) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;

  let url =   "https://api.chec.io/v1/orders";
  let setting = {
    method: "GET",
    url: url,
    headers: {
        "X-Authorization": "sk_38714b6c03d587e6a26cba7eb2ec95f419c2dc489daa8",
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
  };
  mostrarLoader(true);
  axios(setting)
    .then((res) => {
      let response = res.data;
      if (response.type != "error") {

        let data = response.data;
        if(filtros!=null){
            //PROCESS DATA
             data = response.data.filter((e)=>{
                let desde = Math.floor(filtros.desde.getTime() / 1000)
                let hasta = Math.floor(filtros.hasta.getTime() / 1000)
                return (e.created>=desde&&e.created<=hasta)
            })
        }
        let monto=0
        data.map((e)=>{
          monto +=  e.order_value.raw
        })
        let kpi1 = {
            valor: monto,
            ventas: data.length
        }
       setData(kpi1);
        mostrarLoader(false);
        mostrarNotificacion({ type: "success", message: response.message });
      } else {
        mostrarNotificacion({ type: "error", message: response.message });
        mostrarLoader(false);
      }
    })
    .catch((error) => {
      mostrarLoader(false);

      mostrarNotificacion({ type: "error", message: error.message });
    });
};
export const obtenerNúmeroProductos = (filtros,setData,setData2,setData3, setData4,store) => {
    const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
  
    let url =   "https://api.chec.io/v1/products";
    let setting = {
      method: "GET",
      params:{
          id: "ord_eN1ql9K44Yoz3y"
      },
      url: url,
      headers: {
          "X-Authorization": "sk_38714b6c03d587e6a26cba7eb2ec95f419c2dc489daa8",
          "Accept": "application/json",
          "Content-Type": "application/json",
      },
    };
    mostrarLoader(true);
    axios(setting)
      .then((res) => {
        let response = res.data;
        if (response.type != "error") {
          
            let data = response.data;
            if(filtros!=null){
                //PROCESS DATA
                 data = response.data.filter((e)=>{
                    let desde = Math.floor(filtros.desde.getTime() / 1000)
                    let hasta = Math.floor(filtros.hasta.getTime() / 1000)
                    return (e.created>=desde&&e.created<=hasta)
                })
            }

            let values=[]
            let labels=[]
            let lastProducts=[]
            let todos=[]
            data.map((e,i)=>{
                    labels.push(e.name)
                    values.push(e.inventory.available)
                    if(i<=5){
                        lastProducts.push({name:e.name,stock:e.inventory.available,price:e.price.raw,image:e.image?.url})
                    }
                    todos.push({name:e.name,stock:e.inventory.available,price:e.price.raw,image:e.image?.url})

            });
            setData(data.length);
            setData2({values:values,labels})
            setData3(lastProducts)
            setData4(todos)
          mostrarLoader(false);
          mostrarNotificacion({ type: "success", message: response.message });
        } else {
          mostrarNotificacion({ type: "error", message: response.message });
          mostrarLoader(false);
        }
      })
      .catch((error) => {
        mostrarLoader(false);
  
        mostrarNotificacion({ type: "error", message: error.message });
      });
  };
  export const obtenerNúmeroCategorías = (filtros,setData, store) => {
    const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
  
    let url =    "https://api.chec.io/v1/categories";
    let setting = {
      method: "GET",
      params:{
          id: "ord_eN1ql9K44Yoz3y"
      },
      url: url,
      headers: {
          "X-Authorization": "sk_38714b6c03d587e6a26cba7eb2ec95f419c2dc489daa8",
          "Accept": "application/json",
          "Content-Type": "application/json",
      },
    };
    mostrarLoader(true);
    axios(setting)
      .then((res) => {
        let response = res.data;
        if (response.type != "error") {
            let data = response.data;
            if(filtros!=null){
                //PROCESS DATA
                 data = response.data.filter((e)=>{
                    let desde = Math.floor(filtros.desde.getTime() / 1000)
                    let hasta = Math.floor(filtros.hasta.getTime() / 1000)
                    return (e.created>=desde&&e.created<=hasta)
                })
            }

         setData(data.length);
          mostrarLoader(false);
          mostrarNotificacion({ type: "success", message: response.message });
        } else {
          mostrarNotificacion({ type: "error", message: response.message });
          mostrarLoader(false);
        }
      })
      .catch((error) => {
        mostrarLoader(false);
  
        mostrarNotificacion({ type: "error", message: error.message });
      });
  };
export const obtenerTodosTabla = (setData, store) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;

  let url = ENTRYPOINT+"countries/all";
  let setting = {
    method: "GET",
    url: url,
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,
    },
  };
  mostrarLoader(true);

  axios(setting)
    .then((res) => {
      let response = res.data;
      if (response.type != "error") {
        setData({data:response,backup:response});
        mostrarLoader(false);
        mostrarNotificacion({ type: "success", message: response.message });
      } else {
        mostrarNotificacion({ type: "error", message: response.message });
        mostrarLoader(false);
      }
    })
    .catch((error) => {
      mostrarLoader(false);

      mostrarNotificacion({ type: "error", message: error.message });
    });
};
export const editarPais = (data,atras, store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
    const {

        pais_id,name
    } = data;
    var raw = {
   
   
      pais_id:pais_id,
      name:name,
    
  
    };
    let url =  ENTRYPOINT+"countries/edit";
    let setting = {
      method: "POST",
      url: url,
      data: raw,
      body: raw,
      headers: { Accept: "application/json",  Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token, },
    };
    mostrarLoader(true);
  
    axios(setting)
      .then((res) => {
        let response = res.data;
        if (response.type != "error") {
         
          mostrarLoader(false);
          mostrarNotificacion({ type: "success", message: response.message });
          atras()
        } else {
          mostrarNotificacion({ type: "error", message: response.message });
          mostrarLoader(false);
        }
      })
      .catch((error) => {
        mostrarLoader(false);
  
        mostrarNotificacion({ type: "error", message: error.message });
      });
  };
   export const registerCountry = (data, atras,store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
    const {

        pais_id,name
    } = data;
    var raw = {
   
   
      pais_id:pais_id,
      name:name,
    
  
    };
    let url = ENTRYPOINT+"countrie/register";
    let setting = {
      method: "POST",
      url: url,
      data: raw,
      body: raw,
      headers: { Accept: "application/json",
      Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,  },
    };
    mostrarLoader(true);
  
    axios(setting)
      .then((res) => {
        let response = res.data;
        if (response.type != "error") {
         
          mostrarLoader(false);
          mostrarNotificacion({ type: "success", message: response.message });
          atras()
        } else {
          mostrarNotificacion({ type: "error", message: response.message });
          mostrarLoader(false);
        }
      })
      .catch((error) => {
        mostrarLoader(false);
  
        mostrarNotificacion({ type: "error", message: error.message });
      });
  }
  export const eliminarPais = (country_id,store,cargarData) => {
    const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
  
    let url = ENTRYPOINT+"countrie/delete";
    var raw = {
        country_id:country_id,
    };
    let setting = {
      method: "DELETE",
      url: url,
      data: raw,
      body: raw,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,
  
      }
    };
    mostrarLoader(true);
  
    axios(setting)
      .then((res) => {
        let response = res.data
        if(res.data.type!="error"){
        
          mostrarLoader(false);
          mostrarNotificacion({ type: "success", message: response.message });
          cargarData()
        }else{
        
          mostrarLoader(false);
          mostrarNotificacion({ type: "error", message: response.message });
        }
        
      })
      .catch((error) => {
        mostrarLoader(false);
        mostrarNotificacion({ type: "success", message: error.message });
      });
  };
  