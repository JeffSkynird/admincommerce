import { IconButton } from "@material-ui/core";
import React from "react";
import ReactExport from "react-export-excel";
import ImportExportIcon from '@material-ui/icons/ImportExportOutlined';
import SaveAlt from '@material-ui/icons/SaveAlt';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const dataSet1 = [
    {
        name: "Johson",
        amount: 30000,
        sex: 'M',
        is_married: true
    },
    {
        name: "Monika",
        amount: 355000,
        sex: 'F',
        is_married: false
    },
    {
        name: "John",
        amount: 250000,
        sex: 'M',
        is_married: false
    },
    {
        name: "Josef",
        amount: 450500,
        sex: 'M',
        is_married: true
    }
];

const dataSet2 = [
    {
        name: "Johnson",
        total: 25,
        remainig: 16
    },
    {
        name: "Josef",
        total: 25,
        remainig: 7
    }
];

export default class Download extends React.Component {
  
    render() {

        return (
            <ExcelFile  element={
                <IconButton aria-label="abrirmodal">
                <SaveAlt />
                </IconButton>

                }>
                <ExcelSheet data={this.props.productos} name="Productos">
                    <ExcelColumn label="Nombre" value="name"/>
                    <ExcelColumn label="Stock" value="stock"/>
                    <ExcelColumn label="Precio" value="price"/>
                </ExcelSheet>
            
            </ExcelFile>
        );
    }
}