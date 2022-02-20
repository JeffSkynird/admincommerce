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
import { Avatar, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import { editar, registrar } from '../../../utils/API/categorias';
import { Autocomplete } from '@material-ui/lab';
import MaterialTable from 'material-table';
import { LocalizationTable, TableIcons } from '../../../utils/table';
//import { obtenerRolUsuario, obtenerTodos } from '../../../../utils/API/roles';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function Crear(props) {
    const initializer = React.useContext(Initializer);

    const [nombre, setNombre] = React.useState("")
    const [documento, setDocumento] = React.useState("")
    const [direccion1, setDireccion1] = React.useState(" ")
    const [direccion2, setDireccion2] = React.useState(" ")
    const [celular, setCelular] = React.useState("")
    const [ciudad, setCiudad] = React.useState("")
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
    const [data, setData] = React.useState([])
    const [descripcion, setDescripcion] = React.useState("")
    React.useEffect(() => {
        if (initializer.usuario != null) {
            // obtenerTodos(setRoles, initializer)
        }

    }, [initializer.usuario])
    React.useEffect(() => {
        if (props.sistema != null) {
            setNombre(props.sistema.customer.firstname)
            setApellidos(props.sistema.customer.lastname)
            setDocumento(props.sistema.dni)
            setRol(props.sistema.rol_id)
            setCorreo(props.sistema.customer.email)
            setTelefono(props.sistema.customer.phone)
            setDescripcion(props.sistema.description)
            setDireccion1(props.sistema.billing.street)
            setDireccion2(props.sistema.billing.street_2)
            setCiudad(props.sistema.billing.town_city)
            setData(props.sistema.order.line_items)
        }
    }, [props.sistema])
    const guardar = () => {

        let data = {
            'name': nombre,
            'description': descripcion,

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
        setDocumento("")
        setDescripcion("")
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
            <DialogTitle id="alert-dialog-slide-title">Productos - total: ${props.sistema!=null?props.sistema.order_value.raw:""}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    A continuación se desglosa los items comprados
                </DialogContentText>

                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <Typography color="initial"  style={{fontWeight:'bold'}}>Cliente</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>    <TextField
                        variant="outlined"
                        style={{ width: '100%' }}
                        size="small"
                        label="Nombre"
                        value={nombre + " " + apellidos}
                    /></Grid>
                    <Grid item xs={12} md={6}>    <TextField
                        variant="outlined"
                        style={{ width: '100%' }}
                        label="Correo"
                        size="small"
                        value={correo}
                    /></Grid>
                    <Grid item xs={12}>    <TextField
                        variant="outlined"
                        style={{ width: '100%' }}
                        label="Teléfono"
                        size="small"
                        value={telefono}
                    /></Grid>
                       <Grid item xs={12} md={12}>
                       <Typography color="initial" style={{fontWeight:'bold'}}>Dirección de facturación</Typography>
                    </Grid>
                
                    <Grid item xs={12} md={6}>    <TextField
                        variant="outlined"
                        style={{ width: '100%' }}
                        label="Dirección 1"
                        value={direccion1}
                        size="small"
                    /></Grid>
                      <Grid item xs={12} md={6}>    <TextField
                        variant="outlined"
                        style={{ width: '100%' }}
                        label="Dirección 2"
                        size="small"
                        value={direccion2}
                    /></Grid>
                       <Grid item xs={12} md={12}>    <TextField
                        variant="outlined"
                        style={{ width: '100%' }}
                        label="Ciudad"
                        size="small"
                        value={ciudad}
                    /></Grid>
                    <Grid item md={12} xs={12}>
                        <MaterialTable
                            icons={TableIcons}
                            columns={[
                                {title:"image", field:"image", render: rowData => <img src={rowData.image.url} style={{borderRadius:50,width:50,height:50}}/>},
                                { title: "Nombre", field: "product_name" },

                                {
                                    title: "Cantidad", field: "quantity"
                                },
                                {
                                    title: "Precio", field: "price", type: "currency", render: rowData => {
                                        return (<span>${rowData.price.raw}</span>)
                                    }
                                }



                            ]}
                            data={
                                data
                            }
                            localization={LocalizationTable}


                            title={
                                <div>
                                    <Typography style={{ display: 'inline' }}>Productos</Typography>

                                </div>

                            }
                            options={{
                                paging: false,
                                actionsColumnIndex: -1,
                                search: false,
                                maxBodyHeight: 350,
                                padding: 'dense',
                                headerStyle: {
                                    textAlign: 'left'
                                },
                                cellStyle: {
                                    textAlign: 'left'
                                },
                                searchFieldStyle: {

                                    padding: 5
                                }
                            }}

                        />
                    </Grid>


                </Grid>

            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    limpiar()
                    props.setOpen(false)
                }} color="default">
                    Cerrar
                </Button>
              
            </DialogActions>
        </Dialog>
    )
}
