import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';
import moment from 'moment';

function Traininglist() {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false)

    const dateFormatter = (params) => {
        return moment(params.value).format('DD/MM/YYYY');
      }

    useEffect(() => {
        fecthTrainings();
    }, []);

    const openSnackBar = () => {
        setOpen(true);
    }

    const closeSnackBar = () => {
        setOpen(false);
    }


    const fecthTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data))

    }

    const deleteTraining = (id) => {
        if (window.confirm('Are you sure you want to delete this training?')) {
            fetch("https://customerrest.herokuapp.com/api/trainings/" + id, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        fecthTrainings();
                        openSnackBar();
                    }
                    else
                        alert('You cant delete this training right now!')
                })
                .catch(err => console.err(err))
        }
    }

    const columns = [
        { field: 'activity', sortable: true, filter: true, floatingFilter: true, width: "150%"  },
        { field: 'date', headerName: 'Date', sortable: true, filter: true, floatingFilter: true, width: "150%", cellRenderer: (data) => {return moment(data.createdAt).format('DD/MM/YYYY HH:mm')}},
        { field: 'duration', headerName:"Duration (min)", sortable: true, filter: true, floatingFilter: true,  width: "150%"  },
        { field: 'customer.firstname', sortable: true, filter: true, floatingFilter: true, width: "200%" },
        { field: 'customer.lastname', sortable: true, filter: true, floatingFilter: true, width: "200%"  },

        {
            headerName: 'Delete',
            field: 'id',
            width: 100,
            cellRendererFramework: params => 
            <IconButton color="secondary" onClick={() => deleteTraining(params.value)}>
                <DeleteIcon/>
            </IconButton>
        }

    ]

    return (
        <div>
            <h2>Traininglist</h2>
            <div className="ag-theme-material" style={{ height: 650, width: '90%', margin: 'auto' }}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={9}
                    animateRows={true}
                    suppressCellSelection={true}
                />
            </div>
            <Snackbar
                open={open}
                message='Training deleted succesfully'
                autoHideDuration={2000}
                onClose={closeSnackBar}
            />
        </div>
    )
}

export default Traininglist;