import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import EditCustomer from './EditCustomer';
import Snackbar from '@material-ui/core/Snackbar';
import AddCustomer from './AddCustomer';
import AddTraining from './AddTraining';


function Customerlist() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false)

    useEffect(() => {
        fecthCustomers();
    }, []);

    const openSnackBar = () => {
        setOpen(true);
    }

    const closeSnackBar = () => {
        setOpen(false);
    }


    const fecthCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))
            .catch(err => console.err(err))

    }

    const deleteCustomer = (url) => {
        
        if (window.confirm('Are you sure?')) {
            fetch(url, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        fecthCustomers();
                        openSnackBar();
                    }
                    else
                        alert('Could not delete this customer!')
                })
                .catch(err => console.err(err))
        }
    }

    const addCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers',
            {
                method: 'POST',
                body: JSON.stringify(newCustomer),
                headers: { 'Content-type': 'application/json' }
            })
            .then(response => fecthCustomers())
            .catch(err => console.error(err))
    }

    const editCustomer = (url, editCustomer) => {
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(editCustomer),
            headers: { 'Content-type': 'application/json' }
        })
            .then(_ => fecthCustomers())
            .catch(err => console.error(err))
    }

    const addTraining = (newTraining) => {
        fetch('https://customerrest.herokuapp.com/api/trainings',
            {
                method: 'POST',
                body: JSON.stringify(newTraining),
                headers: { 'Content-type': 'application/json' }
            })
            .catch(err => console.error(err))
    }

    const columns = [
        { field: 'firstname', sortable: true, filter: true, floatingFilter: true, width: "150%" },
        { field: 'lastname', sortable: true, filter: true, floatingFilter: true, width: "150%" },
        { field: 'streetaddress', sortable: true, filter: true, floatingFilter: true, width: "150%" },
        { field: 'postcode', sortable: true, filter: true, floatingFilter: true, width: "130%%" },
        { field: 'city', sortable: true, filter: true, floatingFilter: true, width: "150%" },
        { field: 'email', sortable: true, filter: true, floatingFilter: true, width: "200%%" },
        { field: 'phone', sortable: true, filter: true, floatingFilter: true, width: "150%" },
        {
            headerName: 'Edit',
            field: '_links.self.href',
            width: 100,
            valueGetter: (params) => params.data.links[0].href,
            cellRendererFramework: params =>
                <EditCustomer link={params.value} customer={params.data} editCustomer={editCustomer} />
        }, {
            headerName: 'Delete',
            field: '_links.self.href',
            width: 100,
            valueGetter: (params) => params.data.links[0].href,
            cellRendererFramework: params =>
                <IconButton color="secondary" onClick={() => deleteCustomer(params.value)}>
                    <DeleteIcon />
                </IconButton>
                
        },
            {
            headerName: 'Add training',
            field: '_links.self.href',
            width: 150,
            valueGetter: (params) => params.data.links[0].href,
            cellRendererFramework: params =>
                <AddTraining link={params.value} addTraining={addTraining} />
            }


    ]

    return (

        <div>
            <h2>Customerlist</h2>
            <AddCustomer addCustomer={addCustomer}/>
            
            <div className="ag-theme-material" style={{ height: 650, width: '90%', margin: 'auto' }}>

                <AgGridReact
                    rowData={customers}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={9}
                    suppressCellSelection={true}
                    animateRows={true}
                    rowSelection="single"
                    
                    
                />

            </div>
            <Snackbar
                open={open}
                message='Customer deleted succesfully'
                autoHideDuration={3000}
                onClose={closeSnackBar}
            />
        </div>
    )
}

export default Customerlist;