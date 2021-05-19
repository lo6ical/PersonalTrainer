import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IconButton from '@material-ui/core/IconButton';


function AddTraining(props){
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
        activity:'',
        date:'',
        duration:'',
        customer:''
    });

    const handleClickOpen = () => {
      setTraining({
        ...training,
        customer: props.link
      });
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleSave = () => {
        props.addTraining(training);
        setTraining({
          activity: '',
          date:'',
          duration: '',

          });
        setOpen(false);
    }

    const inputChanged = (event) => {
        setTraining({...training,[event.target.name]: event.target.value})
    }

    return (
        <div>
          <IconButton color="primary" onClick={handleClickOpen}>
            <AddBoxIcon fontSize="large" />
          </IconButton>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">New Training to a Customer</DialogTitle>
            <DialogContent>
              <DialogContentText>
                In this form you can add a training to a customer you want!
              </DialogContentText>
              <TextField
                margin="dense"
                label="Activity"
                name='activity'
                value={training.activity}
                onChange={inputChanged}
                fullWidth
              />
                <TextField
                margin="dense"
                label="Date"
                name="date"
                type="datetime-local"
                value={training.date}
                onChange={inputChanged}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                
              />
              <TextField
                margin="dense"
                label="Duration (min)"
                name='duration'
                value={training.duration}
                onChange={inputChanged}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleSave} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
}

export default AddTraining;