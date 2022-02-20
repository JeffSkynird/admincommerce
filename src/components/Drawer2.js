import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import PersonIcon from '@material-ui/icons/Person';
import Hidden from '@material-ui/core/Hidden';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Avatar from '@material-ui/core/Avatar';
import DashboardIcon from '@material-ui/icons/Dashboard';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import CallMissedOutgoingIcon from '@material-ui/icons/CallMissedOutgoing';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import AccountCircle from '@material-ui/icons/PermIdentity';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from "react-router-dom";
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import Toolbar from '@material-ui/core/Toolbar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { PUBLIC_PATH } from '../config/API'
import ListIcon from '@material-ui/icons/List';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import Initializer from '../store/Initializer'
import { desencriptarJson } from '../utils/security'
import AllInboxIcon from '@material-ui/icons/AllInbox';
import CategoryIcon from '@material-ui/icons/Category';
import StoreIcon from '@material-ui/icons/Store';
import PostAddIcon from '@material-ui/icons/PostAdd';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import TransformIcon from '@material-ui/icons/Transform';
import PaymentIcon from '@material-ui/icons/Payment';
import HomeIcon from '@material-ui/icons/Home';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import TuneIcon from '@material-ui/icons/Tune';
import { cerrarSesion, obtenerUsuario } from '../utils/API/auth';
import GroupOutlinedIcon from "@material-ui/icons/GroupOutlined";
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned';
import { useLocation, Switch } from 'react-router-dom';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import SpeedDial from './SpeedDial';
import CallMissedIcon from '@material-ui/icons/CallMissed';
import logo from '../assets/logo.png'
import ImportExportIcon from '@material-ui/icons/ImportExport';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { Badge, Box, Button, Grid } from '@material-ui/core';
import PrintIcon from '@material-ui/icons/Print';
import Notifications from './Notification';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    search: {
        height: 45,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'rgba(0, 0, 0, 0.12)',
        position: 'relative',
        borderRadius: 10,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            borderColor: 'rgb(30, 136, 229)',
            borderWidth: 1,
            borderStyle: 'solid'
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%', color: 'gray',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit', height: '100%'
    },
    root: {
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
        },
        overflow: 'hidden'
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    avatar: {
        margin: theme.spacing(2),

        width: theme.spacing(10),
        height: theme.spacing(10),
        backgroundColor:"pink",
        fontSize:14
    },

    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        overflowX: 'hidden',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    grow: {
        flexGrow: 1,
    },
}));

function ResponsiveDrawer(props) {

    let history = useHistory();
    const location = useLocation();
    const classes = useStyles();
    const theme = useTheme();
    const [openCollapse, setOpenCollapse] = React.useState(false);
    const [openCollapse2, setOpenCollapse2] = React.useState(false);
    const [openCollapse3, setOpenCollapse3] = React.useState(false);


    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [cambio, setCambio] = React.useState(null)
    const [info, setInfo] = React.useState(null)
    const [file, setFile] = React.useState(null)

    const [names, setNames] = React.useState('')
    const initializer = useContext(Initializer);
    const [notification, setNotification] = React.useState(false)

    React.useEffect(() => {
        if (initializer.usuario != null) {
            obtenerUsuario(setInfo, setNotification, initializer)
        }
    }, [initializer.usuario])
    React.useEffect(() => {
        if (info != null) {
            setNames(info.names + " " + info.last_names)
        }
    }, [info])
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    function handleOpenSettings() {
        setOpenCollapse(!openCollapse);
    }
    const cerrar = () => {
       cerrarSesion(initializer)
    }


    const comprobador = (val) => {

        if (location.pathname == val) {
            return { backgroundColor: '#EDE7F6', borderRadius: 7, color: '#6645B3', marginRight: 5, marginLeft: 5 }
        } else {
            if (location.pathname == "/evaluacion" && val == "/evaluaciones") {
                return { backgroundColor: '#EDE7F6', borderRadius: 7, color: '#6645B3', marginRight: 5, marginLeft: 5 }

            } else {
                return { borderRadius: 7, marginRight: 5, marginLeft: 5 }

            }
        }


    }

    const drawer = (
        <div >
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <Avatar size="" className={classes.avatar}>
        BotiqueKZ
                </Avatar>
                <Typography variant="subtitle1" style={{ fontSize: 15, color: '#929396' }}>
                    Administrador
                </Typography>
                <div style={{
                    width: '150px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden', textAlign: 'center',
                    textOverflow: 'ellipsis'
                }}>
                    <Typography variant="subtitle1" style={{ fontSize: 15, color: '#929396' }}>
                        {names}
                    </Typography>

                </div>


            </div>

            <Divider />
            <div style={{ justifyContent: 'space-between', flexDirection: 'column', display: 'flex' }}>
                <List style={{ padding: 10 }} >

                    <ListItem button onClick={() => props.history.push('panel')} style={comprobador('/panel')}>
                        <ListItemIcon style={{ color: 'inherit' }}><DashboardIcon /> </ListItemIcon>
                        <ListItemText primary={'Dashboard'} />
                    </ListItem>
                    <ListItem button onClick={() => props.history.push('/ventas')} >
                        <ListItemIcon>
                            {" "}
                            <PaymentIcon />{" "}
                        </ListItemIcon>
                        <ListItemText primary="Ventas" />
                    </ListItem>
                    <ListItem button onClick={() => props.history.push('/productos')} >
                        <ListItemIcon>
                            {" "}
                            <StoreIcon />{" "}
                        </ListItemIcon>
                        <ListItemText primary="Productos" />
                    </ListItem>
                    <ListItem button onClick={() => props.history.push('/categorias')} >
                        <ListItemIcon>
                            {" "}
                            <CategoryIcon />{" "}
                        </ListItemIcon>
                        <ListItemText primary="Categorías" />
                    </ListItem>
                    <ListItem button  onClick={() => props.history.push('/descuentos')} >
                        <ListItemIcon>
                            {" "}
                            <MoneyOffIcon />{" "}
                        </ListItemIcon>
                        <ListItemText primary="Descuentos" />
                    </ListItem>

                </List>

                <div>
                    <Divider />
                    <List>
                    
                        <ListItem button onClick={cerrar}>
                            <ListItemIcon><ExitToAppIcon /> </ListItemIcon>
                            <ListItemText primary={'Salir'} />
                        </ListItem>

                    </List>
                </div>
            </div>


        </div>
    );


    console.log(history)
    return (
        <div className={classes.root}>
            <CssBaseline />

            {
                // initializer.usuario != null ?
                history.location.pathname != "/bienvenida" ?

                    <React.Fragment>
                        <AppBar position="fixed">
                            <Toolbar>

                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    edge="start"
                                    onClick={handleDrawerToggle}

                                >
                                    <HomeIcon />
                                </IconButton>
                                <Typography >   Administrador</Typography>

                                <div className={classes.grow} />


                                <Typography style={{ marginRight: 10 }} >   BoutiqueKZ</Typography>
                                {
                                    localStorage.getItem('is_login') != null && (
                                        <IconButton
                                            color="inherit"
                                            aria-label="open drawer"
                                            edge="start"
                                            onClick={cerrar}

                                        >
                                            <ExitToAppIcon />
                                        </IconButton>
                                    )
                                }

                            </Toolbar>
                        </AppBar>
                        <nav aria-label="mailbox folders" className={classes.drawer}>
                            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                            <Hidden smUp implementation="css">
                                <Drawer

                                    variant="temporary"
                                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                                    open={mobileOpen}
                                    onClose={handleDrawerToggle}
                                    classes={{
                                        paper: classes.drawerPaper,
                                    }}
                                    ModalProps={{
                                        keepMounted: true, // Better open performance on mobile.
                                    }}
                                >
                                    {drawer}
                                </Drawer>
                            </Hidden>


                        </nav>
                    </React.Fragment>
                    :
                    null
            }
            <main className={classes.content} style={{ overflow: 'auto', padding: 15 }} >


                <div className={classes.toolbar} />
                {props.children}
          

            </main>
        </div>
    );
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */

};

export default ResponsiveDrawer;
