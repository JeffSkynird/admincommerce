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
import { Avatar, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select } from '@material-ui/core';
import { editar, registrar } from '../../../utils/API/descuentos';
import { Autocomplete } from '@material-ui/lab';
//import { obtenerRolUsuario, obtenerTodos } from '../../../../utils/API/roles';
import RefreshIcon from '@material-ui/icons/Refresh';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function Crear(props) {
    const initializer = React.useContext(Initializer);

    const [codigo, setCodigo] = React.useState("")
    const [valor, setValor] = React.useState("")
    const [cantidad, setCantidad] = React.useState("0")
    const [celular, setCelular] = React.useState("")
    const [correo, setCorreo] = React.useState("")
    const [telefono, setTelefono] = React.useState("")
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

    const [descripcion, setDescripcion] = React.useState("")
    React.useEffect(() => {
        if (initializer.usuario != null) {
            // obtenerTodos(setRoles, initializer)
        }

    }, [initializer.usuario])
    React.useEffect(() => {
        if (props.sistema != null) {
            setCodigo(props.sistema.code)
            setValor(props.sistema.value)
            setCantidad(props.sistema.quantity)
            setRol(props.sistema.rol_id)
            setCorreo(props.sistema.email)
            setDescripcion(props.sistema.description)

        }
    }, [props.sistema])
    const guardar = () => {

        let data = {
            'code': codigo,
            'value': valor,
            'quantity': cantidad

        }
        if (props.sistema == null) {
            registrar(data, initializer, limpiar)

        } else {
            editar(props.sistema.id, data, initializer, limpiar)

        }
        props.setOpen(false)

    }
    const limpiar = () => {
        setCodigo("")
        setValor("")
        setCantidad("")
        setClave("")
        setApellidos("")
        setRol("")
        setCelular("")
        setCorreo("")
        setTelefono("")
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
    const generateSerial =()=>{
        let serial = ""
        for (let i = 0; i < 10; i++) {
            serial += Math.floor(Math.random() * 10)

        }   
        setCodigo(serial)
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
            <DialogTitle id="alert-dialog-slide-title">Descuentos</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {props.sistema != null ? "Formulario de edición de descuentos" : "Formulario de creación de descuentos"}
                </DialogContentText>

                <Grid container spacing={2}>

                    <Grid item xs={12}>    <TextField
                        variant="outlined"
                        style={{ width: '100%' }}

                        label="Código"
                        value={codigo}
                        InputProps={{
                            endAdornment: <InputAdornment position="start">

                                <IconButton
                                    onClick={generateSerial}
                                    edge="end"
                                >
                                    <RefreshIcon />
                                </IconButton>
                            </InputAdornment>,
                        }}
                        onChange={(e) => setCodigo(e.target.value)}

                    /></Grid>

                    <Grid item xs={12}>
                        <TextField
                            style={{ width: '100%' }}

                            onChange={(e) => {
                                const re = /^\d{1,}(\.\d{0,4})?$/

                                // if value is not blank, then test the regex
                            
                                if (e.target.value === '' || re.test(e.target.value)) {
                                setValor(e.target.value)
                                }
                            }}
                        
                            label="Valor"
                            value={valor}
                            InputProps={{
                                endAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                            variant="outlined"
                        />
                    </Grid>
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
