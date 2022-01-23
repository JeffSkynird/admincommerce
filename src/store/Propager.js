import React from 'react'
import Initializer from './Initializer'
import { useHistory } from "react-router-dom";

export default function Propager(props) {
    let history = useHistory();

    const {usuario,cargarUsuario}=React.useContext(Initializer)
    React.useEffect(()=>{
        if( localStorage.getItem('is_login')==null&&history.location.pathname!='/login'){      
            history.push("/login")
        }
    },[])

    return (
        props.children
    )
}
