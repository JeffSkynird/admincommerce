import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Initializer from '../../../store/Initializer'
import AutorenewIcon from '@material-ui/icons/Autorenew';
import Slide from '@material-ui/core/Slide';
import { Avatar, Chip, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select } from '@material-ui/core';
import { editar, registrar } from '../../../utils/API/productos';
import { Autocomplete } from '@material-ui/lab';
import { obtenerTodos } from '../../../utils/API/categorias';
//import { obtenerRolUsuario, obtenerTodos } from '../../../../utils/API/roles';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function Crear(props) {
    const initializer = React.useContext(Initializer);

    const [nombre, setNombre] = React.useState("")
    const [sku, setSku] = React.useState("")
    const [precio, setPrecio] = React.useState("")
    const [cantidad, setCantidad] = React.useState("")
    const [descripcion, setDescripcion] = React.useState("")
    const [imagen, setImagen] = React.useState("")
    const [supplierCode, setSupplirCode] = React.useState("")
    const [serie, setSerie] = React.useState("")
    const [zone, setZone] = React.useState("")
    const [zoneData, setZoneData] = React.useState([])
    const [image, setImage] = React.useState("")

    const [stock, setStock] = React.useState("")
    const [clave, setClave] = React.useState("")
    const [apellidos, setApellidos] = React.useState("")
    const [roles, setRoles] = React.useState([])
    const [rol, setRol] = React.useState("")
    const [categorias, setCategorias] = React.useState([])
    const [categoria, setCategoria] = React.useState("")

    const [categoriasSeleccionadas, setCategoriasSeleccionadas] = React.useState([])

    React.useEffect(() => {
        if (initializer.usuario != null) {
            obtenerTodos(setCategorias, initializer)
        }

    }, [initializer.usuario])
    React.useEffect(() => {
        if (props.sistema != null) {
            setNombre(props.sistema.name)
            setApellidos(props.sistema.sku)
            setSku(props.sistema.sku)
            setPrecio(props.sistema.price)
            setCantidad(buscarStock(props.sistema.chec_id))
            setDescripcion(props.sistema.description)
            setImagen(props.sistema.image)

        }
    }, [props.sistema])
    const buscarStock=(id)=>{

        let stock=0
         props.data2.map((e)=>{
            
            if(e.id==id){
            
                    stock = e.inventory.available
                
            }
        }
         )
         return stock
    }
    const guardar = () => {
console.log(categoriasSeleccionadas)
let data = {
    'name': nombre,
    'sku': sku,
    'quantity': cantidad,
    'price': precio,
    'description': descripcion,
    'image': imagen,
    'categories': categoriasSeleccionadas

}
if (props.sistema == null) {
    registrar(data, initializer, limpiar)

} else {
    editar(props.sistema.id, data, initializer, limpiar)

}
props.setOpen(false)

    }
    const limpiar = () => {
        setNombre("")
        setSku("")
        setCantidad("")
        setPrecio("")
        setImagen("")
        setCategoriasSeleccionadas([])
        setDescripcion("")
        setApellidos("")
        props.setSelected(null)
        props.carga()
    }
    const getName = (id) => {
        let object = null
        zoneData.map((e) => {
            if (id == e.id) {
                object = { ...e }
            }
        })
        return object
    }
    function validarCorreo(valor) {
        if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(valor)) {
            return true;
        } else {
            return false;
        }
    }

    function validar(cedula) {
        var cad = cedula
        var total = 0;
        var longitud = cad.length;
        var longcheck = longitud - 1;

        if (cad !== "" && longitud === 10) {
            for (let i = 0; i < longcheck; i++) {
                if (i % 2 === 0) {
                    var aux = cad.charAt(i) * 2;
                    if (aux > 9) aux -= 9;
                    total += aux;
                } else {
                    total += parseInt(cad.charAt(i)); // parseInt o concatenará en lugar de sumar
                }
            }

            total = total % 10 ? 10 - total % 10 : 0;

            if (cad.charAt(longitud - 1) == total) {
                return true;
            } else {
                return false;
            }
        }
    }
    const buscarPermiso = (permiso) => {
        let permisosAux = categorias
        let encontrado = null
        permisosAux.map((e) => {
            if (e.id == permiso) {
                encontrado = e
            }
        })
        return encontrado
    }
    const existeDato = (id) => {
        let existe = false
        categoriasSeleccionadas.map((e) => {
            console.log("ITERANDO")
            console.log(e.idOrigin)
            console.log(id)
            if (e.idOrigin == id) {
                existe = true
            }
        })
        return existe
    }
    const adicionarCategoria = (permiso) => {
        console.log(permiso)
        let permisosAux = categoriasSeleccionadas.slice()
        let pr = buscarPermiso(permiso)
 console.log(pr)

        if (pr != null) {
            //si existe el permiso en permisosAux no lo agrega
            if (!existeDato(pr.id)) {
       
         
                    console.log("ENTRO")
                    permisosAux.push({
                        id: pr.chec_id,
                        idOrigin: pr.id,
                        name: pr.name
                    })
                    console.log(permisosAux)
                    setCategoriasSeleccionadas(permisosAux)
                    setCategoria(permiso)
              
            }
        }





    }
    const quitar = (permiso) => {
        setCategoria("")
        let permisosAux = categoriasSeleccionadas.slice()
        permisosAux.splice(permisosAux.indexOf(permiso), 1)
        setCategoriasSeleccionadas(permisosAux)

        
    }


    return (
        <Dialog
            open={props.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => {
                props.setOpen(false)
                limpiar()
            }}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">Productos</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {props.sistema != null ? "Formulario de edición de productos" : "Formulario de creación de productos"}
                </DialogContentText>

                <Grid container spacing={2}>
                    <Grid item xs={12}>    <TextField
                        variant="outlined"
                        style={{ width: '100%' }}

                        label="SKU"
                        value={sku}
                        onChange={(e) => setSku(e.target.value)}

                    /></Grid>
                    <Grid item xs={12}>    <TextField
                        variant="outlined"
                        style={{ width: '100%' }}

                        label="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}

                    /></Grid>
                    <Grid item xs={12}>    <TextField
                        variant="outlined"
                        style={{ width: '100%' }}

                        label="Precio"
                        value={precio}
                        onChange={(e) => {
                            const re = /^\d{1,}(\.\d{0,4})?$/

                            // if value is not blank, then test the regex

                            if (e.target.value === '' || re.test(e.target.value)) {
                                setPrecio(e.target.value)
                            }
                        }}
                    /></Grid>
                    <Grid item xs={12}>    <TextField
                        variant="outlined"
                        style={{ width: '100%' }}

                        label="Descripción"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}

                    /></Grid>
                    <Grid item xs={12}>    <TextField
                        variant="outlined"
                        style={{ width: '100%' }}

                        label="Cantidad"
                        value={cantidad}
                        onChange={(e) => {
                            const re = /^[0-9\b]+$/;

                            // if value is not blank, then test the regex

                            if (e.target.value === '' || re.test(e.target.value)) {
                                setCantidad(e.target.value)
                            }
                        }}

                    /></Grid>
                    <Grid item xs={12}>
                        <FormControl style={{ width: '100%' }} variant="outlined" >
                            <InputLabel id="demo-simple-select-filled-label">Agregar categorías</InputLabel>
                            <Select

                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={categoria}
                                onChange={(e) => adicionarCategoria(e.target.value)}
                                label="Categorías"
                            >
                                <MenuItem value="">
                                    <em>Seleccione una opción</em>
                                </MenuItem>
                                {
                                    categorias.map((e) => (
                                        <MenuItem value={e.id}>{e.name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>

                    </Grid>
                    {
                        categoriasSeleccionadas!=0&&(
                            <Grid item xs={12}>
                            {
                                categoriasSeleccionadas.map((e) => (
                                    <Chip label={e.name} style={{ marginRight: 5 }} onClick={() => quitar(e)} />
                                ))
                            }
    
                        </Grid>
                        )
                    }
             


                    <Grid item xs={12}>    <TextField
                        variant="outlined"
                        style={{ width: '100%' }}
                        size="small"
                        label="URL de imagen"
                        value={imagen}
                        onChange={(e) => setImagen(e.target.value)}

                    /></Grid>
                    {
                        imagen != "" && (
                            <Grid item xs={12}>
                                <img style={{ height: 100, width: 100 }} src={imagen} />

                            </Grid>
                        )
                    }

                </Grid>

            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    limpiar()
                    props.setOpen(false)
                }} color="default">
                    Cancelar
                </Button>
                <Button color="primary" onClick={guardar}>
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    )
}
