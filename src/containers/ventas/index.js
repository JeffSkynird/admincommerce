import React from 'react'
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import InputAdornment from '@material-ui/core/InputAdornment';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import Avatar from '@material-ui/core/Avatar';
import Initializer from '../../store/Initializer'

import { LocalizationTable, TableIcons, removeAccent } from '../../utils/table.js'
import MaterialTable from "material-table";
import { Grid } from '@material-ui/core';
import { obtenerTodos } from '../../utils/API/order';
import Crear from './componentes/Crear'
import Eliminar from './componentes/Eliminar'
import Detalle from './componentes/Detalle'

export default function Sistemas(props) {
    const initializer = React.useContext(Initializer);

    const [data, setData] = React.useState([])
    const [open, setOpen] = React.useState(false)
    const [open2, setOpen2] = React.useState(false)
    const [selected, setSelected] = React.useState(null)
    const [selected2, setSelected2] = React.useState(null)
    const [openFilter, setOpenFilter] = React.useState(false)

    React.useEffect(() => {
        if (initializer.usuario != null) {
            obtenerTodos(setData, initializer)
        }
    }, [initializer.usuario])
    const carga = () => {
        obtenerTodos(setData, initializer)
        setSelected(null)
        setSelected2(null)
    }
    const calcular=(value)=>{
        let iva = value*0.12
        let total = value+iva
        return {iva:iva.toFixed(2),total:total.toFixed(2)}
    }
    return (
        <Grid container spacing={2}>
            <Crear sistema={selected} setSelected={setSelected} setOpen={setOpen} open={open} carga={carga} />
            <Detalle sistema={selected} setSelected={setSelected} setOpen={setOpen2} open={open2} carga={carga} />


            <Grid item xs={12} md={12} style={{display:'flex',justifyContent:'space-between'}}>
                <Typography variant="h5" >
                    Ventas
                </Typography>
            
            </Grid>
      
      
      
      
            <Grid item xs={12}>
                <MaterialTable
                    icons={TableIcons}
                    columns={[
                      
                        { title: "Estado", field: "status_payment" ,render:rowData=>rowData.status_payment=='paid'?'Pagado':'Pendiente'},
                        {title:"Cliente",field:"client_name",render:rowData=>rowData.customer.firstname+' '+rowData.customer.lastname},
                        { title: "Subtotal", field: "order_value",type:"currency", render: rowData => <span> ${rowData.order_value.raw}</span> },

                        { title: "IVA", field: "order_value", render: rowData => <span> ${calcular(rowData.order_value.raw).iva}</span> },
                        { title: "Total", field: "order_value", render: rowData => <span> ${calcular(rowData.order_value.raw).total}</span> },
                        { title: "Registro", field: "created", type: "date", render: rowData => <span> {new Date(rowData.created * 1000).toLocaleString()}</span> },


                    ]}
                    data={
                        data
                    }

                    localization={LocalizationTable}

                    actions={[
                        {
                            icon: TableIcons.VisibilityOutlinedIcon,
                            tooltip: 'Ver',

                            onClick: (event, rowData) => {
                                setSelected(rowData)
                                setOpen2(true)
                            }
                        },
                       

                    
                    ]}

                    options={{
                        pageSize:10,
                        showTitle: false,
                        actionsColumnIndex: -1,
                      
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
    )
}
